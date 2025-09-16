package handler

import (
    "github.com/gofiber/fiber/v2"
    "mini-npm-backend/model"
    "mini-npm-backend/database"
)

// GetUsers godoc
// @Summary Get all users
// @Tags Users
// @Produce json
// @Success 200 {array} model.User
// @Router /api/v1.0/users [get]
func GetUsers(c *fiber.Ctx) error {
    var users []model.User
    if err := database.DB.Preload("Roles").Preload("Groups").Find(&users).Error; err != nil {
        return c.Status(500).JSON(fiber.Map{"error": "Failed to fetch users"})
    }
    return c.JSON(users)
}

// CreateUser godoc
// @Summary Create a new user
// @Tags Users
// @Accept json
// @Produce json
// @Param user body model.User true "User data"
// @Success 200 {object} model.User
// @Failure 400 {object} map[string]string
// @Failure 500 {object} map[string]string
// @Router /api/v1.0/users [post]
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

// GetUserByID godoc
// @Summary Get user by ID
// @Tags Users
// @Produce json
// @Param id path int true "User ID"
// @Success 200 {object} model.User
// @Failure 404 {object} map[string]string
// @Router /api/v1.0/users/{id} [get]
func GetUserByID(c *fiber.Ctx) error {
    var user model.User
    id := c.Params("id")
    if err := database.DB.Preload("Roles").Preload("Groups").First(&user, id).Error; err != nil {
        return c.Status(404).JSON(fiber.Map{"error": "User not found"})
    }
    return c.JSON(user)
}

// UpdateUser godoc
// @Summary Update user by ID
// @Tags Users
// @Accept json
// @Produce json
// @Param id path int true "User ID"
// @Param user body model.User true "User data"
// @Success 200 {object} model.User
// @Failure 400 {object} map[string]string
// @Failure 404 {object} map[string]string
// @Failure 500 {object} map[string]string
// @Router /api/v1.0/users/{id} [put]
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

// DeleteUser godoc
// @Summary Delete user by ID
// @Tags Users
// @Param id path int true "User ID"
// @Success 204
// @Failure 500 {object} map[string]string
// @Router /api/v1.0/users/{id} [delete]
func DeleteUser(c *fiber.Ctx) error {
    id := c.Params("id")
    if err := database.DB.Delete(&model.User{}, id).Error; err != nil {
        return c.Status(500).JSON(fiber.Map{"error": "Failed to delete user"})
    }
    return c.SendStatus(204)
}