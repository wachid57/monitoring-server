package handler

import (
	"fmt"
	"github.com/gofiber/fiber/v2"
	"monitoring-server/database"
	"monitoring-server/model"
)

// ListICMPChecks returns all ICMP checks
func ListICMPChecks(c *fiber.Ctx) error {
	var checks []model.ICMPCheck
	if err := database.DB.Find(&checks).Error; err != nil {
		return c.Status(500).JSON(fiber.Map{"error": err.Error()})
	}
	return c.JSON(checks)
}

// CreateICMPCheck creates a new ICMP check
func CreateICMPCheck(c *fiber.Ctx) error {
	var payload model.ICMPCheck
	if err := c.BodyParser(&payload); err != nil {
		return c.Status(400).JSON(fiber.Map{"error": err.Error()})
	}
	if payload.Hostname == "" {
		return c.Status(400).JSON(fiber.Map{"error": "hostname required"})
	}
	if payload.HostID == 0 { return c.Status(400).JSON(fiber.Map{"error":"host_id required"}) }
	if payload.IntervalSec == 0 { payload.IntervalSec = 60 }
	if err := database.DB.Create(&payload).Error; err != nil {
		return c.Status(500).JSON(fiber.Map{"error": err.Error()})
	}
	// upsert host service row
	_ = upsertHostService(payload.HostID, "icmp", payload.ID, payload.FriendlyName, fmt.Sprintf("%s / interval %ds", payload.Hostname, payload.IntervalSec))
	return c.Status(201).JSON(payload)
}

// GetICMPCheck retrieves a check by ID
func GetICMPCheck(c *fiber.Ctx) error {
	id := c.Params("id")
	var check model.ICMPCheck
	if err := database.DB.First(&check, id).Error; err != nil {
		return c.Status(404).JSON(fiber.Map{"error": "not found"})
	}
	return c.JSON(check)
}

// UpdateICMPCheck updates a check by ID
func UpdateICMPCheck(c *fiber.Ctx) error {
	id := c.Params("id")
	var existing model.ICMPCheck
	if err := database.DB.First(&existing, id).Error; err != nil {
		return c.Status(404).JSON(fiber.Map{"error": "not found"})
	}
	var payload model.ICMPCheck
	if err := c.BodyParser(&payload); err != nil {
		return c.Status(400).JSON(fiber.Map{"error": err.Error()})
	}
	existing.FriendlyName = payload.FriendlyName
	if payload.HostID != 0 { existing.HostID = payload.HostID }
	if payload.Hostname != "" { existing.Hostname = payload.Hostname }
	if payload.IntervalSec > 0 { existing.IntervalSec = payload.IntervalSec }
	existing.Retries = payload.Retries
	existing.RetryIntervalSec = payload.RetryIntervalSec
	existing.ResendDownCount = payload.ResendDownCount
	if payload.MonitorType != "" { existing.MonitorType = payload.MonitorType }
	if err := database.DB.Save(&existing).Error; err != nil {
		return c.Status(500).JSON(fiber.Map{"error": err.Error()})
	}
	_ = upsertHostService(existing.HostID, "icmp", existing.ID, existing.FriendlyName, fmt.Sprintf("%s / interval %ds", existing.Hostname, existing.IntervalSec))
	return c.JSON(existing)
}

// DeleteICMPCheck deletes a check by ID
func DeleteICMPCheck(c *fiber.Ctx) error {
	id := c.Params("id")
	var existing model.ICMPCheck
	if err := database.DB.First(&existing, id).Error; err == nil {
		_ = deleteHostService(existing.HostID, "icmp", existing.ID)
	}
	if err := database.DB.Delete(&model.ICMPCheck{}, id).Error; err != nil {
		return c.Status(500).JSON(fiber.Map{"error": err.Error()})
	}
	return c.SendStatus(204)
}
