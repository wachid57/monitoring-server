package handler

import (
	"github.com/gofiber/fiber/v2"
	"monitoring-server/database"
	"monitoring-server/model"
)

// GetServiceGroupBindings returns all service group bindings
func GetServiceGroupBindings(c *fiber.Ctx) error {
	var bindings []model.ServiceGroupBinding
	if err := database.DB.Find(&bindings).Error; err != nil {
		return c.Status(500).JSON(fiber.Map{"error": "Failed to fetch service group bindings"})
	}
	return c.JSON(bindings)
}

// CreateServiceGroupBinding creates a new service group binding
func CreateServiceGroupBinding(c *fiber.Ctx) error {
	var b model.ServiceGroupBinding
	if err := c.BodyParser(&b); err != nil {
		return c.Status(400).JSON(fiber.Map{"error": "Invalid request"})
	}
	if err := database.DB.Create(&b).Error; err != nil {
		return c.Status(500).JSON(fiber.Map{"error": "Failed to create service group binding"})
	}
	return c.JSON(b)
}

// GetServiceGroupBindingByID returns a single binding by ID
func GetServiceGroupBindingByID(c *fiber.Ctx) error {
	var b model.ServiceGroupBinding
	id := c.Params("id")
	if err := database.DB.First(&b, id).Error; err != nil {
		return c.Status(404).JSON(fiber.Map{"error": "Service group binding not found"})
	}
	return c.JSON(b)
}

// UpdateServiceGroupBinding updates an existing binding
func UpdateServiceGroupBinding(c *fiber.Ctx) error {
	var b model.ServiceGroupBinding
	id := c.Params("id")
	if err := database.DB.First(&b, id).Error; err != nil {
		return c.Status(404).JSON(fiber.Map{"error": "Service group binding not found"})
	}
	if err := c.BodyParser(&b); err != nil {
		return c.Status(400).JSON(fiber.Map{"error": "Invalid request"})
	}
	if err := database.DB.Save(&b).Error; err != nil {
		return c.Status(500).JSON(fiber.Map{"error": "Failed to update service group binding"})
	}
	return c.JSON(b)
}

// DeleteServiceGroupBinding deletes a binding by ID
func DeleteServiceGroupBinding(c *fiber.Ctx) error {
	id := c.Params("id")
	if err := database.DB.Delete(&model.ServiceGroupBinding{}, id).Error; err != nil {
		return c.Status(500).JSON(fiber.Map{"error": "Failed to delete service group binding"})
	}
	return c.SendStatus(204)
}

