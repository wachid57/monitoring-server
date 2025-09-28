package handler

import (
    "github.com/gofiber/fiber/v2"
    "monitoring-server/database"
    "monitoring-server/model"
)

// GetHostGroupBindings godoc
// @Summary List host group bindings
// @Tags HostGroupBindings
// @Produce json
// @Success 200 {array} model.HostGroupBinding
// @Security BearerAuth
// @Router /api/v1.0/hosts/groups/bindings/ [get]
func GetHostGroupBindings(c *fiber.Ctx) error {
    var bindings []model.HostGroupBinding
    if err := database.DB.Find(&bindings).Error; err != nil {
        return c.Status(500).JSON(fiber.Map{"error": "Failed to fetch host group bindings"})
    }
    return c.JSON(bindings)
}

// CreateHostGroupBinding godoc
// @Summary Create host group binding
// @Tags HostGroupBindings
// @Accept json
// @Produce json
// @Param data body model.HostGroupBinding true "HostGroup Binding"
// @Success 200 {object} model.HostGroupBinding
// @Security BearerAuth
// @Router /api/v1.0/hosts/groups/bindings/ [post]
func CreateHostGroupBinding(c *fiber.Ctx) error {
    var b model.HostGroupBinding
    if err := c.BodyParser(&b); err != nil {
        return c.Status(400).JSON(fiber.Map{"error": "Invalid request"})
    }
    if err := database.DB.Create(&b).Error; err != nil {
        return c.Status(500).JSON(fiber.Map{"error": "Failed to create host group binding"})
    }
    return c.JSON(b)
}

// GetHostGroupBindingByID godoc
// @Summary Get host group binding
// @Tags HostGroupBindings
// @Produce json
// @Param id path int true "ID"
// @Success 200 {object} model.HostGroupBinding
// @Security BearerAuth
// @Router /api/v1.0/hosts/groups/bindings/{id} [get]
func GetHostGroupBindingByID(c *fiber.Ctx) error {
    var b model.HostGroupBinding
    id := c.Params("id")
    if err := database.DB.First(&b, id).Error; err != nil {
        return c.Status(404).JSON(fiber.Map{"error": "Host group binding not found"})
    }
    return c.JSON(b)
}

// UpdateHostGroupBinding godoc
// @Summary Update host group binding
// @Tags HostGroupBindings
// @Accept json
// @Produce json
// @Param id path int true "ID"
// @Param data body model.HostGroupBinding true "HostGroup Binding"
// @Success 200 {object} model.HostGroupBinding
// @Security BearerAuth
// @Router /api/v1.0/hosts/groups/bindings/{id} [put]
func UpdateHostGroupBinding(c *fiber.Ctx) error {
    var b model.HostGroupBinding
    id := c.Params("id")
    if err := database.DB.First(&b, id).Error; err != nil {
        return c.Status(404).JSON(fiber.Map{"error": "Host group binding not found"})
    }
    if err := c.BodyParser(&b); err != nil {
        return c.Status(400).JSON(fiber.Map{"error": "Invalid request"})
    }
    if err := database.DB.Save(&b).Error; err != nil {
        return c.Status(500).JSON(fiber.Map{"error": "Failed to update host group binding"})
    }
    return c.JSON(b)
}

// DeleteHostGroupBinding godoc
// @Summary Delete host group binding
// @Tags HostGroupBindings
// @Param id path int true "ID"
// @Success 204
// @Security BearerAuth
// @Router /api/v1.0/hosts/groups/bindings/{id} [delete]
func DeleteHostGroupBinding(c *fiber.Ctx) error {
    id := c.Params("id")
    if err := database.DB.Delete(&model.HostGroupBinding{}, id).Error; err != nil {
        return c.Status(500).JSON(fiber.Map{"error": "Failed to delete host group binding"})
    }
    return c.SendStatus(204)
}
