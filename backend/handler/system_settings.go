package handler

import (
    "github.com/gofiber/fiber/v2"
    "monitoring-server/database"
    "monitoring-server/model"
)

// GetSystemSettings godoc
// @Summary List system settings
// @Tags SystemSettings
// @Produce json
// @Success 200 {array} model.SystemSetting
// @Security BearerAuth
// @Router /api/v1.0/system/settings/ [get]
func GetSystemSettings(c *fiber.Ctx) error {
    var settings []model.SystemSetting
    if err := database.DB.Find(&settings).Error; err != nil {
        return c.Status(500).JSON(fiber.Map{"error": err.Error()})
    }
    return c.JSON(settings)
}

// UpsertSystemSetting godoc
// @Summary Upsert system setting
// @Description Create or update system setting by key (Native entries cannot be newly created by user)
// @Tags SystemSettings
// @Accept json
// @Produce json
// @Param data body model.SystemSetting true "System Setting"
// @Success 200 {object} model.SystemSetting
// @Security BearerAuth
// @Router /api/v1.0/system/settings/ [post]
func UpsertSystemSetting(c *fiber.Ctx) error {
    var payload model.SystemSetting
    if err := c.BodyParser(&payload); err != nil {
        return c.Status(400).JSON(fiber.Map{"error": err.Error()})
    }
    if payload.Key == "" {
        return c.Status(400).JSON(fiber.Map{"error": "key is required"})
    }
    var existing model.SystemSetting
    if err := database.DB.Where("key = ?", payload.Key).First(&existing).Error; err == nil {
        existing.Value = payload.Value
        if payload.Name != "" { existing.Name = payload.Name }
        if payload.Description != "" { existing.Description = payload.Description }
        // Enabled can be toggled irrespective of native (but you might restrict if needed)
        existing.Enabled = payload.Enabled
        if err := database.DB.Save(&existing).Error; err != nil {
            return c.Status(500).JSON(fiber.Map{"error": err.Error()})
        }
        return c.JSON(existing)
    }
    // New custom (non-native) entry
    payload.Native = false
    if err := database.DB.Create(&payload).Error; err != nil {
        return c.Status(500).JSON(fiber.Map{"error": err.Error()})
    }
    return c.Status(201).JSON(payload)
}

// DeleteSystemSetting godoc
// @Summary Delete system setting
// @Tags SystemSettings
// @Param key path string true "Setting Key"
// @Success 204
// @Security BearerAuth
// @Router /api/v1.0/system/settings/{key} [delete]
func DeleteSystemSetting(c *fiber.Ctx) error {
    key := c.Params("key")
    if key == "" {
        return c.Status(400).JSON(fiber.Map{"error": "key param required"})
    }
    var setting model.SystemSetting
    if err := database.DB.Where("key = ?", key).First(&setting).Error; err != nil {
        return c.Status(404).JSON(fiber.Map{"error":"not found"})
    }
    if setting.Native {
        return c.Status(400).JSON(fiber.Map{"error":"cannot delete native setting"})
    }
    if err := database.DB.Delete(&setting).Error; err != nil {
        return c.Status(500).JSON(fiber.Map{"error": err.Error()})
    }
    return c.SendStatus(204)
}
