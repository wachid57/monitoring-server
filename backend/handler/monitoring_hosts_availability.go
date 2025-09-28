package handler

import (
    "time"
    "fmt"
    "github.com/gofiber/fiber/v2"
    "monitoring-server/database"
    "monitoring-server/model"
    "strconv"
)

type AvailabilityItem struct {
    HostID        uint    `json:"host_id"`
    Hostname      string  `json:"host_name"`
    ServiceType   string  `json:"service_type"`
    ServiceID     uint    `json:"service_id"`
    ServiceName   string  `json:"service_name"`
    OkPct         float64 `json:"ok_pct"`
    WarnPct       float64 `json:"warn_pct"`
    CritPct       float64 `json:"crit_pct"`
    UnknownPct    float64 `json:"unknown_pct"`
    FlappingPct   float64 `json:"flapping_pct"`
    HardDownPct   float64 `json:"hard_down_pct"`
    DowntimePct   float64 `json:"downtime_pct"`
    NAPct         float64 `json:"na_pct"`
}

type AvailabilitySummary struct {
    OkPct       float64 `json:"ok_pct"`
    WarnPct     float64 `json:"warn_pct"`
    CritPct     float64 `json:"crit_pct"`
    UnknownPct  float64 `json:"unknown_pct"`
    FlappingPct float64 `json:"flapping_pct"`
    HardDownPct float64 `json:"hard_down_pct"`
    DowntimePct float64 `json:"downtime_pct"`
    NAPct       float64 `json:"na_pct"`
}

type AvailabilityResponse struct {
    Range struct {
        From    time.Time `json:"from"`
        To      time.Time `json:"to"`
        Seconds int64     `json:"seconds"`
    } `json:"range"`
    Items   []AvailabilityItem  `json:"items"`
    Summary AvailabilitySummary `json:"summary"`
}

// GetHostsAvailability godoc
// @Summary Host services availability
// @Description Aggregated availability percentages per host service in time range
// @Tags Availability
// @Param from query string false "RFC3339 start time (default: now-24h)"
// @Param to query string false "RFC3339 end time (default: now)"
// @Param service_type query string false "Filter by service_type (e.g. icmp)"
// @Produce json
// @Success 200 {object} AvailabilityResponse
// @Security BearerAuth
// @Router /api/v1.0/monitoring/hosts/availability/ [get]
func GetHostsAvailability(c *fiber.Ctx) error {
    // Parse time range
    toStr := c.Query("to", "")
    fromStr := c.Query("from", "")
    now := time.Now().UTC()
    toTime := now
    if toStr != "" { if t, err := time.Parse(time.RFC3339, toStr); err == nil { toTime = t } }
    fromTime := toTime.Add(-24 * time.Hour)
    if fromStr != "" { if t, err := time.Parse(time.RFC3339, fromStr); err == nil { fromTime = t } }
    if fromTime.After(toTime) { tmp := fromTime; fromTime = toTime.Add(-1*time.Hour); toTime = tmp }
    totalSeconds := int64(toTime.Sub(fromTime).Seconds())
    if totalSeconds <= 0 { totalSeconds = 1 }

    serviceTypeFilter := c.Query("service_type", "")
    hostIDStr := c.Query("host_id", "")
    var hostID uint64
    var hostIDFilter bool
    if hostIDStr != "" {
        if v, err := strconv.ParseUint(hostIDStr, 10, 64); err == nil {
            hostID = v
            hostIDFilter = true
        }
    }

    // Load baseline events (last before from) + in-range events
    var events []model.ServiceStatusEvent
    q := database.DB
    if serviceTypeFilter != "" { q = q.Where("service_type = ?", serviceTypeFilter) }
    if hostIDFilter { q = q.Where("host_id = ?", hostID) }
    // Fetch events that affect range
    if err := q.Where("occurred_at <= ?", toTime).Order("host_id, service_type, service_id, occurred_at").Find(&events).Error; err != nil {
        return c.Status(500).JSON(fiber.Map{"error": err.Error()})
    }

    // Map host/service meta (pull HostService names for labeling)
    var hostServices []model.HostService
    hsQ := database.DB
    if serviceTypeFilter != "" { hsQ = hsQ.Where("service_type = ?", serviceTypeFilter) }
    if hostIDFilter { hsQ = hsQ.Where("host_id = ?", hostID) }
    hsQ.Find(&hostServices)
    labelMap := make(map[string]model.HostService)
    for _, hs := range hostServices {
        key := keyHS(hs.HostID, hs.ServiceType, hs.ServiceID)
        labelMap[key] = hs
    }

    type buckets struct {
        ok, warn, crit, unknown, hdown, transitions float64
        lastStatus string
        lastTime   time.Time
        haveStart  bool
    }
    data := map[string]*buckets{}

    advance := func(b *buckets, status string, from, to time.Time) {
        if to.Before(from) { return }
        dur := to.Sub(from).Seconds()
        if dur < 0 { return }
        switch status {
        case "OK": b.ok += dur
        case "WARN": b.warn += dur
        case "CRIT": b.crit += dur
        case "UNKNOWN": b.unknown += dur
        case "H.DOWN": b.hdown += dur
        }
    }

    // Iterate events grouped logically
    for _, ev := range events {
        if ev.OccurredAt.Before(fromTime) {
            // baseline update
            key := keyHS(ev.HostID, ev.ServiceType, ev.ServiceID)
            b := data[key]
            if b == nil { b = &buckets{}; data[key] = b }
            if b.haveStart == false || ev.OccurredAt.After(b.lastTime) {
                b.lastStatus = ev.Status
                b.lastTime = fromTime // baseline anchor at range start
                b.haveStart = true
            }
            continue
        }
        if ev.OccurredAt.After(toTime) { continue }
        key := keyHS(ev.HostID, ev.ServiceType, ev.ServiceID)
        b := data[key]
        if b == nil { b = &buckets{}; data[key] = b }
        // If first in-range event without baseline, assume UNKNOWN until this event
        if !b.haveStart {
            b.lastStatus = "UNKNOWN"
            b.lastTime = fromTime
            b.haveStart = true
        }
        // allocate previous segment
        advance(b, b.lastStatus, b.lastTime, ev.OccurredAt)
        if ev.Status != b.lastStatus { b.transitions++ }
        b.lastStatus = ev.Status
        b.lastTime = ev.OccurredAt
    }

    // Close open segments to toTime
    for _, b := range data {
        if b.haveStart {
            advance(b, b.lastStatus, b.lastTime, toTime)
        }
    }

    // Build response items
    resp := AvailabilityResponse{}
    resp.Range.From = fromTime
    resp.Range.To = toTime
    resp.Range.Seconds = totalSeconds

    // Preload host names map
    var hosts []model.Host
    database.DB.Find(&hosts)
    hostNameMap := map[uint]string{}
    for _, h := range hosts { if h.Hostname != "" { hostNameMap[h.ID] = h.Hostname } else { hostNameMap[h.ID] = fmt.Sprintf("host-%d", h.ID) } }

    for key, b := range data {
        hs := labelMap[key]
        total := float64(totalSeconds)
        na := total - (b.ok + b.warn + b.crit + b.unknown + b.hdown)
        if na < 0 { na = 0 }
        item := AvailabilityItem{
            HostID: hs.HostID,
            Hostname: hostNameMap[hs.HostID],
            ServiceType: hs.ServiceType,
            ServiceID: hs.ServiceID,
            ServiceName: hs.Name,
            OkPct: pct(b.ok, total),
            WarnPct: pct(b.warn, total),
            CritPct: pct(b.crit, total),
            UnknownPct: pct(b.unknown, total),
            FlappingPct: flappingPct(b.transitions, totalSeconds),
            HardDownPct: pct(b.hdown, total),
            DowntimePct: pct(b.crit+b.hdown, total),
            NAPct: pct(na, total),
        }
        resp.Items = append(resp.Items, item)
    }

    // Summary (simple average weighted by totalSeconds equally per service)
    var sum AvailabilitySummary
    n := float64(len(resp.Items))
    if n > 0 {
        for _, it := range resp.Items {
            sum.OkPct += it.OkPct
            sum.WarnPct += it.WarnPct
            sum.CritPct += it.CritPct
            sum.UnknownPct += it.UnknownPct
            sum.FlappingPct += it.FlappingPct
            sum.HardDownPct += it.HardDownPct
            sum.DowntimePct += it.DowntimePct
            sum.NAPct += it.NAPct
        }
        sum.OkPct /= n
        sum.WarnPct /= n
        sum.CritPct /= n
        sum.UnknownPct /= n
        sum.FlappingPct /= n
        sum.HardDownPct /= n
        sum.DowntimePct /= n
        sum.NAPct /= n
    }
    resp.Summary = sum

    return c.JSON(resp)
}

func keyHS(hostID uint, st string, sid uint) string { return fmt.Sprintf("%d|%s|%d", hostID, st, sid) }

func pct(v, total float64) float64 { if total <= 0 { return 0 }; return (v / total) * 100 }

func flappingPct(transitions float64, totalSeconds int64) float64 {
    if totalSeconds == 0 { return 0 }
    // simplistic heuristic: if transitions per hour > 6 mark 5% flapping else 0
    hours := float64(totalSeconds) / 3600.0
    if hours <= 0 { hours = 1 }
    rate := transitions / hours
    if rate > 6 { return 5.0 }
    return 0
}