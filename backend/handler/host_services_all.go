package handler

import (
    "github.com/gofiber/fiber/v2"
    "monitoring-server/database"
    "monitoring-server/model"
)

// ListAllHostServices returns all host services across hosts (for service group binding selection)
func ListAllHostServices(c *fiber.Ctx) error {
    var services []model.HostService
    if err := database.DB.Find(&services).Error; err != nil {
        return c.Status(500).JSON(fiber.Map{"error": err.Error()})
    }
    return c.JSON(fiber.Map{"services": services})
}
