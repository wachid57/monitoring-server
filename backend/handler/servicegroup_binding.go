package handler

import (
    "github.com/gofiber/fiber/v2"
    "monitoring-server/database"
    "monitoring-server/model"
)

// GetServiceGroupBindings godoc
// @Summary List Service Group Bindings
// @Tags ServiceGroupBinding
// @Produce json
// @Success 200 {array} model.ServiceGroupBinding
// @Security BearerAuth
// @Router /api/v1.0/services/groups/bindings/ [get]
func GetServiceGroupBindings(c *fiber.Ctx) error {
    var bindings []model.ServiceGroupBinding
    if err := database.DB.Find(&bindings).Error; err != nil {
        return c.Status(500).JSON(fiber.Map{"error": "Failed to fetch service group bindings"})
    }
    return c.JSON(bindings)
}

// CreateServiceGroupBinding godoc
// @Summary Create Service Group Binding
// @Tags ServiceGroupBinding
// @Accept json
// @Produce json
// @Param data body model.ServiceGroupBinding true "Service Group Binding"
// @Success 200 {object} model.ServiceGroupBinding
// @Security BearerAuth
// @Router /api/v1.0/services/groups/bindings/ [post]
func CreateServiceGroupBinding(c *fiber.Ctx) error {
    var b model.ServiceGroupBinding
    if err := c.BodyParser(&b); err != nil { return c.Status(400).JSON(fiber.Map{"error": "Invalid request"}) }
    if err := database.DB.Create(&b).Error; err != nil {
        return c.Status(500).JSON(fiber.Map{"error": "Failed to create service group binding"})
    }
    return c.JSON(b)
}

// GetServiceGroupBindingByID godoc
// @Summary Get Service Group Binding by ID
// @Tags ServiceGroupBinding
// @Produce json
// @Param id path int true "ID"
// @Success 200 {object} model.ServiceGroupBinding
// @Security BearerAuth
// @Router /api/v1.0/services/groups/bindings/{id} [get]
func GetServiceGroupBindingByID(c *fiber.Ctx) error {
    id := c.Params("id")
    var b model.ServiceGroupBinding
    if err := database.DB.First(&b, id).Error; err != nil {
        return c.Status(404).JSON(fiber.Map{"error": "Service group binding not found"})
    }
    return c.JSON(b)
}

// UpdateServiceGroupBinding godoc
// @Summary Update Service Group Binding
// @Tags ServiceGroupBinding
// @Accept json
// @Produce json
// @Param id path int true "ID"
// @Param data body model.ServiceGroupBinding true "Service Group Binding"
// @Success 200 {object} model.ServiceGroupBinding
// @Security BearerAuth
// @Router /api/v1.0/services/groups/bindings/{id} [put]
func UpdateServiceGroupBinding(c *fiber.Ctx) error {
    id := c.Params("id")
    var b model.ServiceGroupBinding
    if err := database.DB.First(&b, id).Error; err != nil {
        return c.Status(404).JSON(fiber.Map{"error": "Service group binding not found"})
    }
    if err := c.BodyParser(&b); err != nil { return c.Status(400).JSON(fiber.Map{"error": "Invalid request"}) }
    if err := database.DB.Save(&b).Error; err != nil {
        return c.Status(500).JSON(fiber.Map{"error": "Failed to update service group binding"})
    }
    return c.JSON(b)
}

// DeleteServiceGroupBinding godoc
// @Summary Delete Service Group Binding
// @Tags ServiceGroupBinding
// @Param id path int true "ID"
// @Success 204
// @Security BearerAuth
// @Router /api/v1.0/services/groups/bindings/{id} [delete]
func DeleteServiceGroupBinding(c *fiber.Ctx) error {
    id := c.Params("id")
    if err := database.DB.Delete(&model.ServiceGroupBinding{}, id).Error; err != nil {
        return c.Status(500).JSON(fiber.Map{"error": "Failed to delete service group binding"})
    }
    return c.SendStatus(204)
}
