package handler

import (
    "github.com/gofiber/fiber/v2"
    "mini-npm-backend/model"
    "mini-npm-backend/database"
)

// GetICMPServices godoc
// @Summary List ICMP services
// @Tags ICMP
// @Produce json
// @Success 200 {array} model.ICMPService
// @Security BearerAuth
// @Router /api/v1.0/services/availability/icmp/ [get]
func GetICMPServices(c *fiber.Ctx) error {
    var services []model.ICMPService
    if err := database.DB.Find(&services).Error; err != nil {
        return c.Status(500).JSON(fiber.Map{"error": err.Error()})
    }
    return c.JSON(services)
}

// CreateICMPService godoc
// @Summary Create ICMP service
// @Tags ICMP
// @Accept json
// @Produce json
// @Param data body model.ICMPService true "ICMP Service"
// @Success 200 {object} model.ICMPService
// @Security BearerAuth
// @Router /api/v1.0/services/availability/icmp/ [post]
func CreateICMPService(c *fiber.Ctx) error {
    var service model.ICMPService
    if err := c.BodyParser(&service); err != nil {
        return c.Status(400).JSON(fiber.Map{"error": err.Error()})
    }
    if err := database.DB.Create(&service).Error; err != nil {
        return c.Status(500).JSON(fiber.Map{"error": err.Error()})
    }
    return c.JSON(service)
}

// GetICMPServiceByID godoc
// @Summary Get ICMP service by ID
// @Tags ICMP
// @Produce json
// @Param id path int true "ID"
// @Success 200 {object} model.ICMPService
// @Security BearerAuth
// @Router /api/v1.0/services/availability/icmp/{id} [get]
func GetICMPServiceByID(c *fiber.Ctx) error {
    var service model.ICMPService
    id := c.Params("id")
    if err := database.DB.First(&service, id).Error; err != nil {
        return c.Status(404).JSON(fiber.Map{"error": "Not found"})
    }
    return c.JSON(service)
}

// UpdateICMPService godoc
// @Summary Update ICMP service
// @Tags ICMP
// @Accept json
// @Produce json
// @Param id path int true "ID"
// @Param data body model.ICMPService true "ICMP Service"
// @Success 200 {object} model.ICMPService
// @Security BearerAuth
// @Router /api/v1.0/services/availability/icmp/{id} [put]
func UpdateICMPService(c *fiber.Ctx) error {
    var service model.ICMPService
    id := c.Params("id")
    if err := database.DB.First(&service, id).Error; err != nil {
        return c.Status(404).JSON(fiber.Map{"error": "Not found"})
    }
    if err := c.BodyParser(&service); err != nil {
        return c.Status(400).JSON(fiber.Map{"error": err.Error()})
    }
    if err := database.DB.Save(&service).Error; err != nil {
        return c.Status(500).JSON(fiber.Map{"error": err.Error()})
    }
    return c.JSON(service)
}

// DeleteICMPService godoc
// @Summary Delete ICMP service
// @Tags ICMP
// @Param id path int true "ID"
// @Success 204
// @Security BearerAuth
// @Router /api/v1.0/services/availability/icmp/{id} [delete]
func DeleteICMPService(c *fiber.Ctx) error {
    id := c.Params("id")
    if err := database.DB.Delete(&model.ICMPService{}, id).Error; err != nil {
        return c.Status(500).JSON(fiber.Map{"error": err.Error()})
    }
    return c.SendStatus(204)
}
