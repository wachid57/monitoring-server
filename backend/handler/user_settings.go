package handler

import (
	"github.com/gofiber/fiber/v2"
	"monitoring-server/database"
	"monitoring-server/model"
	"monitoring-server/database/seed"
	"gorm.io/gorm"
)

// ListUserSettings returns all settings for the authenticated user
func ListUserSettings(c *fiber.Ctx) error {
	username := c.Locals("username")
	if username == nil {
		return c.Status(401).JSON(fiber.Map{"error":"unauthorized"})
	}
	var user model.User
	if err := database.DB.Where("username = ?", username.(string)).First(&user).Error; err != nil {
		return c.Status(404).JSON(fiber.Map{"error":"user not found"})
	}
	var settings []model.UserSetting
	if err := database.DB.Where("user_id = ?", user.ID).Find(&settings).Error; err != nil {
		return c.Status(500).JSON(fiber.Map{"error": err.Error()})
	}
	if len(settings) == 0 {
		// Lazy init defaults for this user
		if err := seed.SeedDefaultsForUser(user.ID); err != nil {
			return c.Status(500).JSON(fiber.Map{"error": "failed seeding defaults"})
		}
		if err := database.DB.Where("user_id = ?", user.ID).Find(&settings).Error; err != nil {
			return c.Status(500).JSON(fiber.Map{"error": err.Error()})
		}
	}
	return c.JSON(settings)
}

// UpsertUserSetting creates or updates a user setting by key for the authenticated user
func UpsertUserSetting(c *fiber.Ctx) error {
	username := c.Locals("username")
	if username == nil {
		return c.Status(401).JSON(fiber.Map{"error":"unauthorized"})
	}
	var user model.User
	if err := database.DB.Where("username = ?", username.(string)).First(&user).Error; err != nil {
		return c.Status(404).JSON(fiber.Map{"error":"user not found"})
	}

	var payload model.UserSetting
	if err := c.BodyParser(&payload); err != nil {
		return c.Status(400).JSON(fiber.Map{"error": err.Error()})
	}
	if payload.Key == "" {
		return c.Status(400).JSON(fiber.Map{"error":"key is required"})
	}

	var existing model.UserSetting
	if err := database.DB.Where("user_id = ? AND `key` = ?", user.ID, payload.Key).First(&existing).Error; err == nil {
		// Update mutable fields
		existing.Value = payload.Value
		if payload.Description != "" { existing.Description = payload.Description }
		if payload.Name != "" { existing.Name = payload.Name }
		// Enabled can be toggled explicitly (only if provided). Native is immutable.
		if err := database.DB.Model(&existing).Updates(map[string]interface{}{
			"value": existing.Value,
			"description": existing.Description,
			"name": existing.Name,
			"enabled": payload.Enabled, // if zero-value bool and not intended? client must always send desired state
		}).Error; err != nil {
			return c.Status(500).JSON(fiber.Map{"error": err.Error()})
		}
		return c.JSON(existing)
	} else if err != nil && err != gorm.ErrRecordNotFound {
		return c.Status(500).JSON(fiber.Map{"error": err.Error()})
	}

	// Creating new custom entry: force Native = false (even if client tries true)
	payload.UserID = user.ID
	payload.Native = false
	if payload.Enabled == false { payload.Enabled = true } // default enable unless explicitly disabled
	if err := database.DB.Create(&payload).Error; err != nil {
		return c.Status(500).JSON(fiber.Map{"error": err.Error()})
	}
	return c.Status(201).JSON(payload)
}

// DeleteUserSetting deletes a setting by key for the authenticated user
func DeleteUserSetting(c *fiber.Ctx) error {
	username := c.Locals("username")
	if username == nil {
		return c.Status(401).JSON(fiber.Map{"error":"unauthorized"})
	}
	var user model.User
	if err := database.DB.Where("username = ?", username.(string)).First(&user).Error; err != nil {
		return c.Status(404).JSON(fiber.Map{"error":"user not found"})
	}

	key := c.Params("key")
	if key == "" { return c.Status(400).JSON(fiber.Map{"error":"key param required"}) }

	var setting model.UserSetting
	if err := database.DB.Where("user_id = ? AND `key` = ?", user.ID, key).First(&setting).Error; err != nil {
		return c.Status(404).JSON(fiber.Map{"error":"setting not found"})
	}
	if setting.Native {
		return c.Status(400).JSON(fiber.Map{"error":"cannot delete native user setting"})
	}
	if err := database.DB.Delete(&setting).Error; err != nil {
		return c.Status(500).JSON(fiber.Map{"error": err.Error()})
	}
	return c.SendStatus(204)
}
