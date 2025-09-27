package handler

import (
	"github.com/gofiber/fiber/v2"
	"monitoring-server/database"
	"monitoring-server/model"
)

type userSettingPayload struct {
	Key         string `json:"key"`
	Value       string `json:"value"`
	Name        string `json:"name"`
	Description string `json:"description"`
	Enabled     bool   `json:"enabled"`
	// Native ignored from client for safety
}

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

	// ensure default native settings for this user exist
	if err := EnsureUserDefaultSettings(user.ID); err != nil {
		return c.Status(500).JSON(fiber.Map{"error": err.Error()})
	}
	var settings []model.UserSetting
	if err := database.DB.Where("user_id = ?", user.ID).Find(&settings).Error; err != nil {
		return c.Status(500).JSON(fiber.Map{"error": err.Error()})
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

	var payload userSettingPayload
	if err := c.BodyParser(&payload); err != nil {
		return c.Status(400).JSON(fiber.Map{"error": err.Error()})
	}
	if payload.Key == "" {
		return c.Status(400).JSON(fiber.Map{"error":"key is required"})
	}

	var existing model.UserSetting
	if err := database.DB.Where("user_id = ? AND `key` = ?", user.ID, payload.Key).First(&existing).Error; err == nil {
		existing.Value = payload.Value
		if payload.Description != "" { existing.Description = payload.Description }
		if payload.Name != "" { existing.Name = payload.Name }
		existing.Enabled = payload.Enabled
		if err := database.DB.Save(&existing).Error; err != nil {
			return c.Status(500).JSON(fiber.Map{"error": err.Error()})
		}
		return c.JSON(existing)
	}
	newSetting := model.UserSetting{
		UserID: user.ID,
		Key: payload.Key,
		Value: payload.Value,
		Name: payload.Name,
		Description: payload.Description,
		Enabled: payload.Enabled,
		Native: false,
	}
	if err := database.DB.Create(&newSetting).Error; err != nil {
		return c.Status(500).JSON(fiber.Map{"error": err.Error()})
	}
	return c.Status(201).JSON(newSetting)
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

	if err := database.DB.Where("user_id = ? AND `key` = ?", user.ID, key).Delete(&model.UserSetting{}).Error; err != nil {
		return c.Status(500).JSON(fiber.Map{"error": err.Error()})
	}
	return c.SendStatus(204)
}
