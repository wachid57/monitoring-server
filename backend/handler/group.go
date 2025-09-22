package handler

import (
    "github.com/gofiber/fiber/v2"
    "monitoring-server/model"
    "monitoring-server/database"
)

// GetGroups godoc
// @Summary Get all groups
// @Tags Groups
// @Produce json
// @Success 200 {array} model.Group
// @Security BearerAuth
// @Router /api/v1.0/users/groups [get]
func GetGroups(c *fiber.Ctx) error {
    var groups []model.Group
    if err := database.DB.Find(&groups).Error; err != nil {
        return c.Status(500).JSON(fiber.Map{"error": "Failed to fetch groups"})
    }
    return c.JSON(groups)
}

// CreateGroup godoc
// @Summary Create a new group
// @Tags Groups
// @Accept json
// @Produce json
// @Param group body model.Group true "Group data"
// @Success 200 {object} model.Group
// @Failure 400 {object} map[string]string
// @Failure 500 {object} map[string]string
// @Security BearerAuth
// @Router /api/v1.0/users/groups [post]
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

// GetGroupByID godoc
// @Summary Get group by ID
// @Tags Groups
// @Produce json
// @Param id path int true "Group ID"
// @Success 200 {object} model.Group
// @Failure 404 {object} map[string]string
// @Security BearerAuth
// @Router /api/v1.0/users/groups/{id} [get]
func GetGroupByID(c *fiber.Ctx) error {
    var group model.Group
    id := c.Params("id")
    if err := database.DB.First(&group, id).Error; err != nil {
        return c.Status(404).JSON(fiber.Map{"error": "Group not found"})
    }
    return c.JSON(group)
}

// UpdateGroup godoc
// @Summary Update group by ID
// @Tags Groups
// @Accept json
// @Produce json
// @Param id path int true "Group ID"
// @Param group body model.Group true "Group data"
// @Success 200 {object} model.Group
// @Failure 400 {object} map[string]string
// @Failure 404 {object} map[string]string
// @Failure 500 {object} map[string]string
// @Security BearerAuth
// @Router /api/v1.0/users/groups/{id} [put]
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

// DeleteGroup godoc
// @Summary Delete group by ID
// @Tags Groups
// @Param id path int true "Group ID"
// @Success 204
// @Failure 500 {object} map[string]string
// @Security BearerAuth
// @Router /api/v1.0/users/groups/{id} [delete]
func DeleteGroup(c *fiber.Ctx) error {
    id := c.Params("id")
    if err := database.DB.Delete(&model.Group{}, id).Error; err != nil {
        return c.Status(500).JSON(fiber.Map{"error": "Failed to delete group"})
    }
    return c.SendStatus(204)
}