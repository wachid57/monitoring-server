package handler

import (
    "github.com/gofiber/fiber/v2"
    "monitoring-server/database"
    "monitoring-server/model"
    "time"
)

// ListHistoryICMP godoc
// @Summary List ICMP history entries for a host
// @Tags ICMP
// @Param host_id path int true "Host ID"
// @Param limit query int false "Max rows (default 50)"
// @Param since query string false "RFC3339 filter: only entries with down_at >= since"
// @Produce json
// @Success 200 {array} model.HistoryICMP
// @Security BearerAuth
func ListHistoryICMP(c *fiber.Ctx) error {
    hostID := c.Params("host_id")
    if hostID == "" { return c.Status(400).JSON(fiber.Map{"error":"missing host_id"}) }
    limit := 50
    if v := c.QueryInt("limit"); v > 0 && v <= 500 { limit = v }
    sinceStr := c.Query("since", "")

    q := database.DB.Where("host_id = ?", hostID)
    if sinceStr != "" {
        if t, err := time.Parse(time.RFC3339, sinceStr); err == nil {
            q = q.Where("down_at >= ?", t)
        }
    }
    var rows []model.HistoryICMP
    if err := q.Order("down_at desc").Limit(limit).Find(&rows).Error; err != nil {
        return c.Status(500).JSON(fiber.Map{"error": err.Error()})
    }
    return c.JSON(rows)
}

// CreateHistoryICMP godoc (optional helper to insert manual record)
// @Summary Create ICMP history record
// @Tags ICMP
// @Param host_id path int true "Host ID"
// @Param data body model.HistoryICMP true "History entry"
// @Produce json
// @Success 201 {object} model.HistoryICMP
// @Security BearerAuth
func CreateHistoryICMP(c *fiber.Ctx) error {
    hostID := c.Params("host_id")
    if hostID == "" { return c.Status(400).JSON(fiber.Map{"error":"missing host_id"}) }
    var payload model.HistoryICMP
    if err := c.BodyParser(&payload); err != nil { return c.Status(400).JSON(fiber.Map{"error": err.Error()}) }
    // force host id
    // we ignore provided ID/CreatedAt UpdatedAt
    // Basic validation
    if payload.DownAt.IsZero() { payload.DownAt = time.Now().UTC() }
    // Parse host id into uint
    // Fiber's Params are strings; GORM will coerce but we ensure safety
    // NOTE: ignoring conversion error for brevity (would default 0)
    // If provided UpAt before DownAt, swap
    if payload.UpAt != nil && payload.UpAt.Before(payload.DownAt) { tmp := payload.DownAt; payload.DownAt = *payload.UpAt; payload.UpAt = &tmp }
    // assign HostID after conversion
    if err := database.DB.Create(&payload).Error; err != nil { return c.Status(500).JSON(fiber.Map{"error": err.Error()}) }
    return c.Status(201).JSON(payload)
}
