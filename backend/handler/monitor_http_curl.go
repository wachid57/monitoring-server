package handler

import (
	"fmt"
	"github.com/gofiber/fiber/v2"
	"monitoring-server/database"
	"monitoring-server/model"
)

// ListHTTPCurlChecks returns all HTTP curl checks
func ListHTTPCurlChecks(c *fiber.Ctx) error {
	var checks []model.HTTPCurlCheck
	if err := database.DB.Find(&checks).Error; err != nil {
		return c.Status(500).JSON(fiber.Map{"error": err.Error()})
	}
	return c.JSON(checks)
}

// CreateHTTPCurlCheck creates a new HTTP curl check
func CreateHTTPCurlCheck(c *fiber.Ctx) error {
	var payload model.HTTPCurlCheck
	if err := c.BodyParser(&payload); err != nil {
		return c.Status(400).JSON(fiber.Map{"error": err.Error()})
	}
	if payload.URL == "" { return c.Status(400).JSON(fiber.Map{"error":"url required"}) }
	if payload.HostID == 0 { return c.Status(400).JSON(fiber.Map{"error":"host_id required"}) }
	if payload.IntervalSec == 0 { payload.IntervalSec = 60 }
	if payload.ExpectedStatus == 0 { payload.ExpectedStatus = 200 }
	if err := database.DB.Create(&payload).Error; err != nil {
		return c.Status(500).JSON(fiber.Map{"error": err.Error()})
	}
	_ = upsertHostService(payload.HostID, "http", payload.ID, payload.FriendlyName, fmt.Sprintf("%s exp %d", payload.URL, payload.ExpectedStatus))
	return c.Status(201).JSON(payload)
}

// GetHTTPCurlCheck retrieves a check by ID
func GetHTTPCurlCheck(c *fiber.Ctx) error {
	id := c.Params("id")
	var check model.HTTPCurlCheck
	if err := database.DB.First(&check, id).Error; err != nil {
		return c.Status(404).JSON(fiber.Map{"error": "not found"})
	}
	return c.JSON(check)
}

// UpdateHTTPCurlCheck updates a check
func UpdateHTTPCurlCheck(c *fiber.Ctx) error {
	id := c.Params("id")
	var existing model.HTTPCurlCheck
	if err := database.DB.First(&existing, id).Error; err != nil {
		return c.Status(404).JSON(fiber.Map{"error": "not found"})
	}
	var payload model.HTTPCurlCheck
	if err := c.BodyParser(&payload); err != nil {
		return c.Status(400).JSON(fiber.Map{"error": err.Error()})
	}
	existing.FriendlyName = payload.FriendlyName
	if payload.HostID != 0 { existing.HostID = payload.HostID }
	if payload.URL != "" { existing.URL = payload.URL }
	if payload.IntervalSec > 0 { existing.IntervalSec = payload.IntervalSec }
	existing.Retries = payload.Retries
	existing.RetryIntervalSec = payload.RetryIntervalSec
	existing.ResendDownCount = payload.ResendDownCount
	if payload.MonitorType != "" { existing.MonitorType = payload.MonitorType }
	if payload.ExpectedStatus > 0 { existing.ExpectedStatus = payload.ExpectedStatus }
	if payload.Keyword != "" { existing.Keyword = payload.Keyword }
	if err := database.DB.Save(&existing).Error; err != nil {
		return c.Status(500).JSON(fiber.Map{"error": err.Error()})
	}
	_ = upsertHostService(existing.HostID, "http", existing.ID, existing.FriendlyName, fmt.Sprintf("%s exp %d", existing.URL, existing.ExpectedStatus))
	return c.JSON(existing)
}

// DeleteHTTPCurlCheck deletes a check
func DeleteHTTPCurlCheck(c *fiber.Ctx) error {
	id := c.Params("id")
	var existing model.HTTPCurlCheck
	if err := database.DB.First(&existing, id).Error; err == nil {
		_ = deleteHostService(existing.HostID, "http", existing.ID)
	}
	if err := database.DB.Delete(&model.HTTPCurlCheck{}, id).Error; err != nil {
		return c.Status(500).JSON(fiber.Map{"error": err.Error()})
	}
	return c.SendStatus(204)
}
