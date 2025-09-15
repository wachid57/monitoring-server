package handler

import (
    "github.com/gofiber/fiber/v2"
    "mini-npm-backend/model"
    "mini-npm-backend/database"
)

// Get all role bindings
func GetRoleBindings(c *fiber.Ctx) error {
    var bindings []model.RoleBinding
    if err := database.DB.Preload("User").Preload("Role").Preload("Group").Find(&bindings).Error; err != nil {
        return c.Status(500).JSON(fiber.Map{"error": "Failed to fetch role bindings"})
    }
    return c.JSON(bindings)
}

// Create role binding
func CreateRoleBinding(c *fiber.Ctx) error {
    var binding model.RoleBinding
    if err := c.BodyParser(&binding); err != nil {
        return c.Status(400).JSON(fiber.Map{"error": "Invalid request"})
    }
    if err := database.DB.Create(&binding).Error; err != nil {
        return c.Status(500).JSON(fiber.Map{"error": "Failed to create role binding"})
    }
    return c.JSON(binding)
}

// Get role binding by ID
func GetRoleBindingByID(c *fiber.Ctx) error {
    var binding model.RoleBinding
    id := c.Params("id")
    if err := database.DB.Preload("User").Preload("Role").Preload("Group").First(&binding, id).Error; err != nil {
        return c.Status(404).JSON(fiber.Map{"error": "Role binding not found"})
    }
    return c.JSON(binding)
}

// Update role binding
func UpdateRoleBinding(c *fiber.Ctx) error {
    var binding model.RoleBinding
    id := c.Params("id")
    if err := database.DB.First(&binding, id).Error; err != nil {
        return c.Status(404).JSON(fiber.Map{"error": "Role binding not found"})
    }
    if err := c.BodyParser(&binding); err != nil {
        return c.Status(400).JSON(fiber.Map{"error": "Invalid request"})
    }
    if err := database.DB.Save(&binding).Error; err != nil {
        return c.Status(500).JSON(fiber.Map{"error": "Failed to update role binding"})
    }
    return c.JSON(binding)
}

// Delete role binding
func DeleteRoleBinding(c *fiber.Ctx) error {
    id := c.Params("id")
    if err := database.DB.Delete(&model.RoleBinding{}, id).Error; err != nil {
        return c.Status(500).JSON(fiber.Map{"error": "Failed to delete role binding"})
    }
    return c.SendStatus(204)
}