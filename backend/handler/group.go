package handler

import (
    "github.com/gofiber/fiber/v2"
    "mini-npm-backend/model"
    "mini-npm-backend/database"
)

// Get all groups
func GetGroups(c *fiber.Ctx) error {
    var groups []model.Group
    if err := database.DB.Find(&groups).Error; err != nil {
        return c.Status(500).JSON(fiber.Map{"error": "Failed to fetch groups"})
    }
    return c.JSON(groups)
}

// Create group
func CreateGroup(c *fiber.Ctx) error {
    var group model.Group
    if err := c.BodyParser(&group); err != nil {
        return c.Status(400).JSON(fiber.Map{"error": "Invalid request"})
    }
    if err := database.DB.Create(&group).Error; err != nil {
        return c.Status(500).JSON(fiber.Map{"error": "Failed to create group"})
    }
    return c.JSON(group)
}

// Get group by ID
func GetGroupByID(c *fiber.Ctx) error {
    var group model.Group
    id := c.Params("id")
    if err := database.DB.First(&group, id).Error; err != nil {
        return c.Status(404).JSON(fiber.Map{"error": "Group not found"})
    }
    return c.JSON(group)
}

// Update group
func UpdateGroup(c *fiber.Ctx) error {
    var group model.Group
    id := c.Params("id")
    if err := database.DB.First(&group, id).Error; err != nil {
        return c.Status(404).JSON(fiber.Map{"error": "Group not found"})
    }
    if err := c.BodyParser(&group); err != nil {
        return c.Status(400).JSON(fiber.Map{"error": "Invalid request"})
    }
    if err := database.DB.Save(&group).Error; err != nil {
        return c.Status(500).JSON(fiber.Map{"error": "Failed to update group"})
    }
    return c.JSON(group)
}

// Delete group
func DeleteGroup(c *fiber.Ctx) error {
    id := c.Params("id")
    if err := database.DB.Delete(&model.Group{}, id).Error; err != nil {
        return c.Status(500).JSON(fiber.Map{"error": "Failed to delete group"})
    }
    return c.SendStatus(204)
}