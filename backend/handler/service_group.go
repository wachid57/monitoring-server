package handler

import (
    "github.com/gofiber/fiber/v2"
    "mini-npm-backend/model"
    "mini-npm-backend/database"
)

// GetServiceGroups godoc
// @Summary List Service Groups
// @Tags ServiceGroup
// @Produce json
// @Success 200 {array} model.ServiceGroup
// @Security BearerAuth
// @Router /api/v1.0/services/groups/ [get]
func GetServiceGroups(c *fiber.Ctx) error {
    var groups []model.ServiceGroup
    if err := database.DB.Find(&groups).Error; err != nil {
        return c.Status(500).JSON(fiber.Map{"error": err.Error()})
    }
    return c.JSON(groups)
}

// CreateServiceGroup godoc
// @Summary Create Service Group
// @Tags ServiceGroup
// @Accept json
// @Produce json
// @Param data body model.ServiceGroup true "Service Group"
// @Success 200 {object} model.ServiceGroup
// @Security BearerAuth
// @Router /api/v1.0/services/groups/ [post]
func CreateServiceGroup(c *fiber.Ctx) error {
    var group model.ServiceGroup
    if err := c.BodyParser(&group); err != nil {
        return c.Status(400).JSON(fiber.Map{"error": err.Error()})
    }
    if err := database.DB.Create(&group).Error; err != nil {
        return c.Status(500).JSON(fiber.Map{"error": err.Error()})
    }
    return c.JSON(group)
}

// GetServiceGroupByID godoc
// @Summary Get Service Group by ID
// @Tags ServiceGroup
// @Produce json
// @Param id path int true "ID"
// @Success 200 {object} model.ServiceGroup
// @Security BearerAuth
// @Router /api/v1.0/services/groups/{id} [get]
func GetServiceGroupByID(c *fiber.Ctx) error {
    var group model.ServiceGroup
    id := c.Params("id")
    if err := database.DB.First(&group, id).Error; err != nil {
        return c.Status(404).JSON(fiber.Map{"error": "Not found"})
    }
    return c.JSON(group)
}

// UpdateServiceGroup godoc
// @Summary Update Service Group
// @Tags ServiceGroup
// @Accept json
// @Produce json
// @Param id path int true "ID"
// @Param data body model.ServiceGroup true "Service Group"
// @Success 200 {object} model.ServiceGroup
// @Security BearerAuth
// @Router /api/v1.0/services/groups/{id} [put]
func UpdateServiceGroup(c *fiber.Ctx) error {
    var group model.ServiceGroup
    id := c.Params("id")
    if err := database.DB.First(&group, id).Error; err != nil {
        return c.Status(404).JSON(fiber.Map{"error": "Not found"})
    }
    if err := c.BodyParser(&group); err != nil {
        return c.Status(400).JSON(fiber.Map{"error": err.Error()})
    }
    if err := database.DB.Save(&group).Error; err != nil {
        return c.Status(500).JSON(fiber.Map{"error": err.Error()})
    }
    return c.JSON(group)
}

// DeleteServiceGroup godoc
// @Summary Delete Service Group
// @Tags ServiceGroup
// @Param id path int true "ID"
// @Success 204
// @Security BearerAuth
// @Router /api/v1.0/services/groups/{id} [delete]
func DeleteServiceGroup(c *fiber.Ctx) error {
    id := c.Params("id")
    if err := database.DB.Delete(&model.ServiceGroup{}, id).Error; err != nil {
        return c.Status(500).JSON(fiber.Map{"error": err.Error()})
    }
    return c.SendStatus(204)
}
