package handler

import (
    "github.com/gofiber/fiber/v2"
    "monitoring-server/database"
    "monitoring-server/model"
)

// ListAllHostServices godoc
// @Summary List all host services
// @Description Returns all host_services across all hosts (used for service group bindings selection)
// @Tags HostServices
// @Produce json
// @Success 200 {object} map[string]interface{}
// @Security BearerAuth
// @Router /api/v1.0/infrastructure/services/host-services [get]
func ListAllHostServices(c *fiber.Ctx) error {
    var services []model.HostService
    if err := database.DB.Find(&services).Error; err != nil {
        return c.Status(500).JSON(fiber.Map{"error": err.Error()})
    }
    return c.JSON(fiber.Map{"services": services})
}
