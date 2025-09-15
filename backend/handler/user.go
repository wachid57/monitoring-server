package handler

import (
    "github.com/gofiber/fiber/v2"
    "mini-npm-backend/model"
    "mini-npm-backend/database"
)

// Get all users
func GetUsers(c *fiber.Ctx) error {
    var users []model.User
    if err := database.DB.Preload("Roles").Preload("Groups").Find(&users).Error; err != nil {
        return c.Status(500).JSON(fiber.Map{"error": "Failed to fetch users"})
    }
    return c.JSON(users)
}

// Create user
func CreateUser(c *fiber.Ctx) error {
    var user model.User
    if err := c.BodyParser(&user); err != nil {
        return c.Status(400).JSON(fiber.Map{"error": "Invalid request"})
    }
    if err := database.DB.Create(&user).Error; err != nil {
        return c.Status(500).JSON(fiber.Map{"error": "Failed to create user"})
    }
    return c.JSON(user)
}

// Get user by ID
func GetUserByID(c *fiber.Ctx) error {
    var user model.User
    id := c.Params("id")
    if err := database.DB.Preload("Roles").Preload("Groups").First(&user, id).Error; err != nil {
        return c.Status(404).JSON(fiber.Map{"error": "User not found"})
    }
    return c.JSON(user)
}

// Update user
func UpdateUser(c *fiber.Ctx) error {
    var user model.User
    id := c.Params("id")
    if err := database.DB.First(&user, id).Error; err != nil {
        return c.Status(404).JSON(fiber.Map{"error": "User not found"})
    }
    if err := c.BodyParser(&user); err != nil {
        return c.Status(400).JSON(fiber.Map{"error": "Invalid request"})
    }
    if err := database.DB.Save(&user).Error; err != nil {
        return c.Status(500).JSON(fiber.Map{"error": "Failed to update user"})
    }
    return c.JSON(user)
}

// Delete user
func DeleteUser(c *fiber.Ctx) error {
    id := c.Params("id")
    if err := database.DB.Delete(&model.User{}, id).Error; err != nil {
        return c.Status(500).JSON(fiber.Map{"error": "Failed to delete user"})
    }
    return c.SendStatus(204)
}