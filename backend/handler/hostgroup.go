package handler

import (
    "github.com/gofiber/fiber/v2"
    "mini-npm-backend/model"
    "mini-npm-backend/database"
)

// GetHostGroups godoc
// @Summary Get all host groups
// @Tags HostGroups
// @Produce json
// @Success 200 {array} model.HostGroup
// @Security BearerAuth
// @Router /api/v1.0/hosts/groups [get]
func GetHostGroups(c *fiber.Ctx) error {
    var groups []model.HostGroup
    if err := database.DB.Find(&groups).Error; err != nil {
        return c.Status(500).JSON(fiber.Map{"error": "Failed to fetch host groups"})
    }
    return c.JSON(groups)
}

// CreateHostGroup godoc
// @Summary Create a new host group
// @Tags HostGroups
// @Accept json
// @Produce json
// @Param hostgroup body model.HostGroup true "HostGroup data"
// @Success 200 {object} model.HostGroup
// @Failure 400 {object} map[string]string
// @Failure 500 {object} map[string]string
// @Security BearerAuth
// @Router /api/v1.0/hosts/groups [post]
func CreateHostGroup(c *fiber.Ctx) error {
    var group model.HostGroup
    if err := c.BodyParser(&group); err != nil {
        return c.Status(400).JSON(fiber.Map{"error": "Invalid request"})
    }
    if err := database.DB.Create(&group).Error; err != nil {
        return c.Status(500).JSON(fiber.Map{"error": "Failed to create host group"})
    }
    return c.JSON(group)
}

// GetHostGroupByID godoc
// @Summary Get host group by ID
// @Tags HostGroups
// @Produce json
// @Param id path int true "HostGroup ID"
// @Success 200 {object} model.HostGroup
// @Failure 404 {object} map[string]string
// @Security BearerAuth
// @Router /api/v1.0/hosts/groups/{id} [get]
func GetHostGroupByID(c *fiber.Ctx) error {
    var group model.HostGroup
    id := c.Params("id")
    if err := database.DB.First(&group, id).Error; err != nil {
        return c.Status(404).JSON(fiber.Map{"error": "Host group not found"})
    }
    return c.JSON(group)
}

// UpdateHostGroup godoc
// @Summary Update host group by ID
// @Tags HostGroups
// @Accept json
// @Produce json
// @Param id path int true "HostGroup ID"
// @Param hostgroup body model.HostGroup true "HostGroup data"
// @Success 200 {object} model.HostGroup
// @Failure 400 {object} map[string]string
// @Failure 404 {object} map[string]string
// @Failure 500 {object} map[string]string
// @Security BearerAuth
// @Router /api/v1.0/hosts/groups/{id} [put]
func UpdateHostGroup(c *fiber.Ctx) error {
    var group model.HostGroup
    id := c.Params("id")
    if err := database.DB.First(&group, id).Error; err != nil {
        return c.Status(404).JSON(fiber.Map{"error": "Host group not found"})
    }
    if err := c.BodyParser(&group); err != nil {
        return c.Status(400).JSON(fiber.Map{"error": "Invalid request"})
    }
    if err := database.DB.Save(&group).Error; err != nil {
        return c.Status(500).JSON(fiber.Map{"error": "Failed to update host group"})
    }
    return c.JSON(group)
}

// DeleteHostGroup godoc
// @Summary Delete host group by ID
// @Tags HostGroups
// @Param id path int true "HostGroup ID"
// @Success 204
// @Failure 500 {object} map[string]string
// @Security BearerAuth
// @Router /api/v1.0/hosts/groups/{id} [delete]
func DeleteHostGroup(c *fiber.Ctx) error {
    id := c.Params("id")
    if err := database.DB.Delete(&model.HostGroup{}, id).Error; err != nil {
        return c.Status(500).JSON(fiber.Map{"error": "Failed to delete host group"})
    }
    return c.SendStatus(204)
}