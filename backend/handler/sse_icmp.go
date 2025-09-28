package handler

import (
    "context"
    "fmt"
    "github.com/gofiber/fiber/v2"
    rc "monitoring-server/redis"
    "strings"
    "time"
)

// StreamICMPSamples provides Server-Sent Events stream of realtime ICMP samples.
// Optional query params: host_id, service_id to filter events server-side.
// Event format: event: icmp\n data: {"host_id":1,"service_id":2,"ts":...,"latency_ms":12.3,"status":"OK"}\n\n
func StreamICMPSamples(c *fiber.Ctx) error {
    if rc.Rdb == nil { return c.Status(503).JSON(fiber.Map{"error":"redis not available"}) }

    hostFilter := strings.TrimSpace(c.Query("host_id"))
    serviceFilter := strings.TrimSpace(c.Query("service_id"))

    // Set SSE headers
    c.Set("Content-Type", "text/event-stream")
    c.Set("Cache-Control", "no-cache")
    c.Set("Connection", "keep-alive")
    // We'll manually write while keeping connection open
    ctxInner, cancel := context.WithCancel(context.Background())
    defer cancel()
    sub := rc.Rdb.Subscribe(ctxInner, "icmp:samples")
    defer sub.Close()
    ch := sub.Channel()
    pingTicker := time.NewTicker(25 * time.Second)
    defer pingTicker.Stop()
    // initial comment
    c.WriteString(": stream started\n\n")
    for {
        select {
        case <-c.Context().Done():
            return nil
        case <-ctxInner.Done():
            return nil
        case <-pingTicker.C:
            c.WriteString(fmt.Sprintf(": ping %d\n\n", time.Now().Unix()))
        case msg, ok := <-ch:
            if !ok { return nil }
            payload := msg.Payload
            if hostFilter != "" || serviceFilter != "" {
                if hostFilter != "" && !strings.Contains(payload, fmt.Sprintf("\"host_id\":%s", hostFilter)) { continue }
                if serviceFilter != "" && !strings.Contains(payload, fmt.Sprintf("\"service_id\":%s", serviceFilter)) { continue }
            }
            c.WriteString("event: icmp\n")
            c.WriteString("data: ")
            c.WriteString(payload)
            c.WriteString("\n\n")
        }
    }
}
