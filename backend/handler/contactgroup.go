package handler

import (
    "github.com/gofiber/fiber/v2"
    "mini-npm-backend/model"
    "mini-npm-backend/database"
)

// GetContactGroups godoc
// @Summary List Contact Groups
// @Tags ContactGroup
// @Produce json
// @Success 200 {array} model.ContactGroup
// @Router /api/v1.0/monitoring/contactgroups/ [get]
func GetContactGroups(c *fiber.Ctx) error {
    var groups []model.ContactGroup
    if err := database.DB.Find(&groups).Error; err != nil {
        return c.Status(500).JSON(fiber.Map{"error": err.Error()})
    }
    return c.JSON(groups)
}

// CreateContactGroup godoc
// @Summary Create Contact Group
// @Tags ContactGroup
// @Accept json
// @Produce json
// @Param data body model.ContactGroup true "Contact Group"
// @Success 200 {object} model.ContactGroup
// @Router /api/v1.0/monitoring/contactgroups/ [post]
func CreateContactGroup(c *fiber.Ctx) error {
    var group model.ContactGroup
    if err := c.BodyParser(&group); err != nil {
        return c.Status(400).JSON(fiber.Map{"error": err.Error()})
    }
    if err := database.DB.Create(&group).Error; err != nil {
        return c.Status(500).JSON(fiber.Map{"error": err.Error()})
    }
    return c.JSON(group)
}

// GetContactGroupByID godoc
// @Summary Get Contact Group by ID
// @Tags ContactGroup
// @Produce json
// @Param id path int true "ID"
// @Success 200 {object} model.ContactGroup
// @Router /api/v1.0/monitoring/contactgroups/{id} [get]
func GetContactGroupByID(c *fiber.Ctx) error {
    var group model.ContactGroup
    id := c.Params("id")
    if err := database.DB.First(&group, id).Error; err != nil {
        return c.Status(404).JSON(fiber.Map{"error": "Not found"})
    }
    return c.JSON(group)
}

// UpdateContactGroup godoc
// @Summary Update Contact Group
// @Tags ContactGroup
// @Accept json
// @Produce json
// @Param id path int true "ID"
// @Param data body model.ContactGroup true "Contact Group"
// @Success 200 {object} model.ContactGroup
// @Router /api/v1.0/monitoring/contactgroups/{id} [put]
func UpdateContactGroup(c *fiber.Ctx) error {
    var group model.ContactGroup
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

// DeleteContactGroup godoc
// @Summary Delete Contact Group
// @Tags ContactGroup
// @Param id path int true "ID"
// @Success 204
// @Router /api/v1.0/monitoring/contactgroups/{id} [delete]
func DeleteContactGroup(c *fiber.Ctx) error {
    id := c.Params("id")
    if err := database.DB.Delete(&model.ContactGroup{}, id).Error; err != nil {
        return c.Status(500).JSON(fiber.Map{"error": err.Error()})
    }
    return c.SendStatus(204)
}
