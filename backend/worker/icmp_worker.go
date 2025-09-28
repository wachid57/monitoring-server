package worker

import (
    "context"
    "fmt"
    "log"
    "time"
    "github.com/go-ping/ping"
    "monitoring-server/database"
    "monitoring-server/model"
    rc "monitoring-server/redis"
)

// ICMPResult persisted in redis list
// key: icmp:series:<host_id>:<service_id>
// last value key: icmp:last:<host_id>:<service_id>
type icmpSample struct {
    Timestamp   int64   `json:"ts"`
    LatencyMs   float64 `json:"latency_ms"`
    Status      string  `json:"status"`
}

type checkRuntime struct {
    Check model.ICMPCheck
    NextRun time.Time
    LastStatus string
}

func StartICMPWorker(stop <-chan struct{}) {
    go func(){
        log.Println("icmp worker: starting")
        // initial load
        runtimes := loadCheckRuntimes()
        ticker := time.NewTicker(5 * time.Second)
        defer ticker.Stop()
        reloadTicker := time.NewTicker(5 * time.Minute)
        defer reloadTicker.Stop()
        for {
            select {
            case <-stop:
                log.Println("icmp worker: stopping")
                return
            case <-ticker.C:
                loopICMP(runtimes)
            case <-reloadTicker.C:
                // reload checks (add new ones; keep existing schedule for unchanged)
                runtimes = mergeRuntimes(runtimes, loadCheckRuntimes())
            }
        }
    }()
}

func loadCheckRuntimes() []*checkRuntime {
    var checks []model.ICMPCheck
    database.DB.Find(&checks)
    now := time.Now().UTC()
    rts := make([]*checkRuntime,0,len(checks))
    for _, c := range checks { rts = append(rts, &checkRuntime{Check:c, NextRun: now, LastStatus: "UNKNOWN"}) }
    return rts
}

func mergeRuntimes(existing, fresh []*checkRuntime) []*checkRuntime {
    // map by check id
    idx := map[uint]*checkRuntime{}
    for _, e := range existing { idx[e.Check.ID] = e }
    for _, f := range fresh {
        if _, ok := idx[f.Check.ID]; !ok { existing = append(existing, f) }
    }
    return existing
}

func loopICMP(rts []*checkRuntime) {
    now := time.Now().UTC()
    for _, rt := range rts {
        if now.Before(rt.NextRun) { continue }
        runICMP(rt)
    }
}

func runICMP(rt *checkRuntime) {
    start := time.Now()
    pinger, err := ping.NewPinger(rt.Check.Hostname)
    if err != nil {
        recordStatus(rt, "DOWN", 0, err)
        scheduleNext(rt)
        return
    }
    pinger.Count = 1
    pinger.Timeout = time.Duration(rt.Check.IntervalSec) * time.Second
    pinger.Interval = time.Second
    pinger.SetPrivileged(true)
    err = pinger.Run() // blocks
    if err != nil {
        recordStatus(rt, "DOWN", 0, err)
    } else {
        stats := pinger.Statistics()
        lat := float64(stats.AvgRtt.Microseconds())/1000.0
        recordStatus(rt, "OK", lat, nil)
    }
    scheduleNext(rt)
    _ = start
}

func scheduleNext(rt *checkRuntime) {
    if rt.Check.IntervalSec <= 0 { rt.Check.IntervalSec = 60 }
    rt.NextRun = time.Now().UTC().Add(time.Duration(rt.Check.IntervalSec) * time.Second)
}

func recordStatus(rt *checkRuntime, status string, latencyMs float64, err error) {
    now := time.Now().UTC()
    // write redis
    if rc.Rdb != nil {
        ctx := context.Background()
        keyLast := lastKey(rt.Check.HostID, rt.Check.ID)
        keySeries := seriesKey(rt.Check.HostID, rt.Check.ID)
        sample := icmpSample{Timestamp: now.Unix(), LatencyMs: latencyMs, Status: status}
        // store JSON simple manual
        payload := fmt.Sprintf("{\"ts\":%d,\"latency_ms\":%.2f,\"status\":\"%s\"}", sample.Timestamp, sample.LatencyMs, sample.Status)
        rc.Rdb.Set(ctx, keyLast, payload, 0)
        rc.Rdb.LPush(ctx, keySeries, payload)
        rc.Rdb.LTrim(ctx, keySeries, 0, 500)
    }
    // if status transition create service_status_events & history_icmp
    if status != rt.LastStatus {
        persistTransition(rt, status, now)
        rt.LastStatus = status
    }
}

func persistTransition(rt *checkRuntime, status string, ts time.Time) {
    // create ServiceStatusEvent
    database.DB.Create(&model.ServiceStatusEvent{HostID: rt.Check.HostID, ServiceType: "icmp", ServiceID: rt.Check.ID, Status: mapStatus(status), OccurredAt: ts})
    // history_icmp handling
    if isDown(status) {
        // open new history row
        database.DB.Create(&model.HistoryICMP{HostID: rt.Check.HostID, DownAt: ts, Description: "auto-detected ICMP down"})
    } else if status == "OK" {
        // close existing open history (latest with up_at null)
        var row model.HistoryICMP
        if err := database.DB.Where("host_id=? AND up_at IS NULL", rt.Check.HostID).Order("down_at desc").First(&row).Error; err == nil {
            database.DB.Model(&row).Update("up_at", ts)
        }
    }
}

func isDown(status string) bool { return status == "DOWN" || status == "CRIT" || status == "H.DOWN" }

func mapStatus(s string) string {
    switch s {
    case "DOWN": return "CRIT" // map simple DOWN to CRIT for aggregation
    default: return s
    }
}

func lastKey(hostID uint, serviceID uint) string { return fmt.Sprintf("icmp:last:%d:%d", hostID, serviceID) }
func seriesKey(hostID uint, serviceID uint) string { return fmt.Sprintf("icmp:series:%d:%d", hostID, serviceID) }
