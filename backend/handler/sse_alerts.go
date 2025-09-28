package handler

import (
    "context"
    "fmt"
    "github.com/gofiber/fiber/v2"
    rc "monitoring-server/redis"
    "strings"
    "time"
)

// StreamAlerts streams realtime alert events from Redis channel alerts:events
// Optional query params: host_id, service_type
func StreamAlerts(c *fiber.Ctx) error {
    if rc.Rdb == nil { return c.Status(503).JSON(fiber.Map{"error":"redis not available"}) }
    hostFilter := strings.TrimSpace(c.Query("host_id"))
    serviceTypeFilter := strings.TrimSpace(c.Query("service_type"))

    c.Set("Content-Type", "text/event-stream")
    c.Set("Cache-Control", "no-cache")
    c.Set("Connection", "keep-alive")

    ctxInner, cancel := context.WithCancel(context.Background())
    defer cancel()
    sub := rc.Rdb.Subscribe(ctxInner, "alerts:events")
    defer sub.Close()
    ch := sub.Channel()
    pingTicker := time.NewTicker(25 * time.Second)
    defer pingTicker.Stop()

    c.WriteString(": alerts stream started\n\n")

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
            if hostFilter != "" && !strings.Contains(payload, fmt.Sprintf("\"host_id\":%s", hostFilter)) { continue }
            if serviceTypeFilter != "" && !strings.Contains(payload, fmt.Sprintf("\"service_type\":\"%s\"", serviceTypeFilter)) { continue }
            c.WriteString("event: alert\n")
            c.WriteString("data: ")
            c.WriteString(payload)
            c.WriteString("\n\n")
        }
    }
}
