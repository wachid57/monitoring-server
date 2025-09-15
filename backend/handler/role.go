package handler

import (
    "github.com/gofiber/fiber/v2"
    "mini-npm-backend/model"
    "mini-npm-backend/database"
)

// Get all roles
func GetRoles(c *fiber.Ctx) error {
    var roles []model.Role
    if err := database.DB.Find(&roles).Error; err != nil {
        return c.Status(500).JSON(fiber.Map{"error": "Failed to fetch roles"})
    }
    return c.JSON(roles)
}

// Create role
func CreateRole(c *fiber.Ctx) error {
    var role model.Role
    if err := c.BodyParser(&role); err != nil {
        return c.Status(400).JSON(fiber.Map{"error": "Invalid request"})
    }
    if err := database.DB.Create(&role).Error; err != nil {
        return c.Status(500).JSON(fiber.Map{"error": "Failed to create role"})
    }
    return c.JSON(role)
}

// Get role by ID
func GetRoleByID(c *fiber.Ctx) error {
    var role model.Role
    id := c.Params("id")
    if err := database.DB.First(&role, id).Error; err != nil {
        return c.Status(404).JSON(fiber.Map{"error": "Role not found"})
    }
    return c.JSON(role)
}

// Update role
func UpdateRole(c *fiber.Ctx) error {
    var role model.Role
    id := c.Params("id")
    if err := database.DB.First(&role, id).Error; err != nil {
        return c.Status(404).JSON(fiber.Map{"error": "Role not found"})
    }
    if err := c.BodyParser(&role); err != nil {
        return c.Status(400).JSON(fiber.Map{"error": "Invalid request"})
    }
    if err := database.DB.Save(&role).Error; err != nil {
        return c.Status(500).JSON(fiber.Map{"error": "Failed to update role"})
    }
    return c.JSON(role)
}

// Delete role
func DeleteRole(c *fiber.Ctx) error {
    id := c.Params("id")
    if err := database.DB.Delete(&model.Role{}, id).Error; err != nil {
        return c.Status(500).JSON(fiber.Map{"error": "Failed to delete role"})
    }
    return c.SendStatus(204)
}