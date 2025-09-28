package handler

import (
    "github.com/gofiber/fiber/v2"
    "monitoring-server/database"
    "monitoring-server/model"
)

// List Alert Rules
func ListAlertRules(c *fiber.Ctx) error {
    var rules []model.AlertRule
    hostID := c.QueryInt("host_id", 0)
    svcType := c.Query("service_type")
    q := database.DB.Model(&model.AlertRule{})
    if hostID > 0 { q = q.Where("host_id = ?", hostID) }
    if svcType != "" { q = q.Where("service_type = ?", svcType) }
    if err := q.Order("id desc").Find(&rules).Error; err != nil { return c.Status(500).JSON(fiber.Map{"error": err.Error()}) }
    return c.JSON(rules)
}

// Create Alert Rule
func CreateAlertRule(c *fiber.Ctx) error {
    var payload model.AlertRule
    if err := c.BodyParser(&payload); err != nil { return c.Status(400).JSON(fiber.Map{"error": err.Error()}) }
    if payload.HostID == 0 { return c.Status(400).JSON(fiber.Map{"error":"host_id required"}) }
    if payload.ServiceType == "" { payload.ServiceType = "icmp" }
    if err := database.DB.Create(&payload).Error; err != nil { return c.Status(500).JSON(fiber.Map{"error": err.Error()}) }
    return c.Status(201).JSON(payload)
}

// Get Alert Rule
func GetAlertRule(c *fiber.Ctx) error {
    id := c.Params("id")
    var rule model.AlertRule
    if err := database.DB.First(&rule, id).Error; err != nil { return c.Status(404).JSON(fiber.Map{"error":"not found"}) }
    return c.JSON(rule)
}

// Update Alert Rule
func UpdateAlertRule(c *fiber.Ctx) error {
    id := c.Params("id")
    var existing model.AlertRule
    if err := database.DB.First(&existing, id).Error; err != nil { return c.Status(404).JSON(fiber.Map{"error":"not found"}) }
    var payload model.AlertRule
    if err := c.BodyParser(&payload); err != nil { return c.Status(400).JSON(fiber.Map{"error": err.Error()}) }
    if payload.ThresholdLatencyMs != nil { existing.ThresholdLatencyMs = payload.ThresholdLatencyMs }
    if payload.MaxConsecutiveFailures != nil { existing.MaxConsecutiveFailures = payload.MaxConsecutiveFailures }
    if payload.CooldownSec != 0 { existing.CooldownSec = payload.CooldownSec }
    if payload.Enabled != existing.Enabled { existing.Enabled = payload.Enabled }
    if payload.ServiceType != "" { existing.ServiceType = payload.ServiceType }
    if payload.HostID != 0 { existing.HostID = payload.HostID }
    if err := database.DB.Save(&existing).Error; err != nil { return c.Status(500).JSON(fiber.Map{"error": err.Error()}) }
    return c.JSON(existing)
}

// Delete Alert Rule
func DeleteAlertRule(c *fiber.Ctx) error {
    id := c.Params("id")
    if err := database.DB.Delete(&model.AlertRule{}, id).Error; err != nil { return c.Status(500).JSON(fiber.Map{"error": err.Error()}) }
    return c.SendStatus(204)
}
