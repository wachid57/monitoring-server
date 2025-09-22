package handler

import (
    "github.com/gofiber/fiber/v2"
    "monitoring-server/model"
    "monitoring-server/database"
)

// GetAknowledged godoc
// @Summary List Aknowledged
// @Tags Aknowledged
// @Produce json
// @Success 200 {array} model.Aknowledged
// @Security BearerAuth
// @Router /api/v1.0/monitoring/aknowledged/ [get]
func GetAknowledged(c *fiber.Ctx) error {
    var items []model.Aknowledged
    if err := database.DB.Find(&items).Error; err != nil {
        return c.Status(500).JSON(fiber.Map{"error": err.Error()})
    }
    return c.JSON(items)
}

// CreateAknowledged godoc
// @Summary Create Aknowledged
// @Tags Aknowledged
// @Accept json
// @Produce json
// @Param data body model.Aknowledged true "Aknowledged"
// @Success 200 {object} model.Aknowledged
// @Security BearerAuth
// @Router /api/v1.0/monitoring/aknowledged/ [post]
func CreateAknowledged(c *fiber.Ctx) error {
    var item model.Aknowledged
    if err := c.BodyParser(&item); err != nil {
        return c.Status(400).JSON(fiber.Map{"error": err.Error()})
    }
    if err := database.DB.Create(&item).Error; err != nil {
        return c.Status(500).JSON(fiber.Map{"error": err.Error()})
    }
    return c.JSON(item)
}

// GetAknowledgedByID godoc
// @Summary Get Aknowledged by ID
// @Tags Aknowledged
// @Produce json
// @Param id path int true "ID"
// @Success 200 {object} model.Aknowledged
// @Security BearerAuth
// @Router /api/v1.0/monitoring/aknowledged/{id} [get]
func GetAknowledgedByID(c *fiber.Ctx) error {
    var item model.Aknowledged
    id := c.Params("id")
    if err := database.DB.First(&item, id).Error; err != nil {
        return c.Status(404).JSON(fiber.Map{"error": "Not found"})
    }
    return c.JSON(item)
}

// UpdateAknowledged godoc
// @Summary Update Aknowledged
// @Tags Aknowledged
// @Accept json
// @Produce json
// @Param id path int true "ID"
// @Param data body model.Aknowledged true "Aknowledged"
// @Success 200 {object} model.Aknowledged
// @Security BearerAuth
// @Router /api/v1.0/monitoring/aknowledged/{id} [put]
func UpdateAknowledged(c *fiber.Ctx) error {
    var item model.Aknowledged
    id := c.Params("id")
    if err := database.DB.First(&item, id).Error; err != nil {
        return c.Status(404).JSON(fiber.Map{"error": "Not found"})
    }
    if err := c.BodyParser(&item); err != nil {
        return c.Status(400).JSON(fiber.Map{"error": err.Error()})
    }
    if err := database.DB.Save(&item).Error; err != nil {
        return c.Status(500).JSON(fiber.Map{"error": err.Error()})
    }
    return c.JSON(item)
}

// DeleteAknowledged godoc
// @Summary Delete Aknowledged
// @Tags Aknowledged
// @Param id path int true "ID"
// @Success 204
// @Security BearerAuth
// @Router /api/v1.0/monitoring/aknowledged/{id} [delete]
func DeleteAknowledged(c *fiber.Ctx) error {
    id := c.Params("id")
    if err := database.DB.Delete(&model.Aknowledged{}, id).Error; err != nil {
        return c.Status(500).JSON(fiber.Map{"error": err.Error()})
    }
    return c.SendStatus(204)
}
