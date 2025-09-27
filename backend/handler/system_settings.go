package handler

import (
    "github.com/gofiber/fiber/v2"
    "monitoring-server/database"
    "monitoring-server/model"
)

// GetSystemSettings lists all system settings as an array
func GetSystemSettings(c *fiber.Ctx) error {
    var settings []model.SystemSetting
    if err := database.DB.Find(&settings).Error; err != nil {
        return c.Status(500).JSON(fiber.Map{"error": err.Error()})
    }
    return c.JSON(settings)
}

// UpsertSystemSetting creates or updates a setting by key
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
        if err := database.DB.Save(&existing).Error; err != nil {
            return c.Status(500).JSON(fiber.Map{"error": err.Error()})
        }
        return c.JSON(existing)
    }
    if err := database.DB.Create(&payload).Error; err != nil {
        return c.Status(500).JSON(fiber.Map{"error": err.Error()})
    }
    return c.Status(201).JSON(payload)
}

// DeleteSystemSetting deletes by key param
func DeleteSystemSetting(c *fiber.Ctx) error {
    key := c.Params("key")
    if key == "" {
        return c.Status(400).JSON(fiber.Map{"error": "key param required"})
    }
    if err := database.DB.Where("key = ?", key).Delete(&model.SystemSetting{}).Error; err != nil {
        return c.Status(500).JSON(fiber.Map{"error": err.Error()})
    }
    return c.SendStatus(204)
}
