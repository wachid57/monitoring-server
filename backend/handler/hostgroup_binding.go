package handler

import (
    "github.com/gofiber/fiber/v2"
    "monitoring-server/database"
    "monitoring-server/model"
)

// GetHostGroupBindings returns all host group bindings
func GetHostGroupBindings(c *fiber.Ctx) error {
    var bindings []model.HostGroupBinding
    if err := database.DB.Find(&bindings).Error; err != nil {
        return c.Status(500).JSON(fiber.Map{"error": "Failed to fetch host group bindings"})
    }
    return c.JSON(bindings)
}

// CreateHostGroupBinding creates a new binding
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

// GetHostGroupBindingByID returns a binding by id
func GetHostGroupBindingByID(c *fiber.Ctx) error {
    var b model.HostGroupBinding
    id := c.Params("id")
    if err := database.DB.First(&b, id).Error; err != nil {
        return c.Status(404).JSON(fiber.Map{"error": "Host group binding not found"})
    }
    return c.JSON(b)
}

// UpdateHostGroupBinding updates a binding by id
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

// DeleteHostGroupBinding deletes a binding by id
func DeleteHostGroupBinding(c *fiber.Ctx) error {
    id := c.Params("id")
    if err := database.DB.Delete(&model.HostGroupBinding{}, id).Error; err != nil {
        return c.Status(500).JSON(fiber.Map{"error": "Failed to delete host group binding"})
    }
    return c.SendStatus(204)
}
