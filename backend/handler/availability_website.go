package handler

import (
    "github.com/gofiber/fiber/v2"
    "mini-npm-backend/model"
    "mini-npm-backend/database"
)

// GetAvailabilityWebsites godoc
// @Summary List Website Availability
// @Tags AvailabilityWebsite
// @Produce json
// @Success 200 {array} model.AvailabilityWebsite
// @Security BearerAuth
// @Router /api/v1.0/services/availability/website/ [get]
func GetAvailabilityWebsites(c *fiber.Ctx) error {
    var items []model.AvailabilityWebsite
    if err := database.DB.Find(&items).Error; err != nil {
        return c.Status(500).JSON(fiber.Map{"error": err.Error()})
    }
    return c.JSON(items)
}

// CreateAvailabilityWebsite godoc
// @Summary Create Website Availability
// @Tags AvailabilityWebsite
// @Accept json
// @Produce json
// @Param data body model.AvailabilityWebsite true "Website Availability"
// @Success 200 {object} model.AvailabilityWebsite
// @Security BearerAuth
// @Router /api/v1.0/services/availability/website/ [post]
func CreateAvailabilityWebsite(c *fiber.Ctx) error {
    var item model.AvailabilityWebsite
    if err := c.BodyParser(&item); err != nil {
        return c.Status(400).JSON(fiber.Map{"error": err.Error()})
    }
    if err := database.DB.Create(&item).Error; err != nil {
        return c.Status(500).JSON(fiber.Map{"error": err.Error()})
    }
    return c.JSON(item)
}

// GetAvailabilityWebsiteByID godoc
// @Summary Get Website Availability by ID
// @Tags AvailabilityWebsite
// @Produce json
// @Param id path int true "ID"
// @Success 200 {object} model.AvailabilityWebsite
// @Security BearerAuth
// @Router /api/v1.0/services/availability/website/{id} [get]
func GetAvailabilityWebsiteByID(c *fiber.Ctx) error {
    var item model.AvailabilityWebsite
    id := c.Params("id")
    if err := database.DB.First(&item, id).Error; err != nil {
        return c.Status(404).JSON(fiber.Map{"error": "Not found"})
    }
    return c.JSON(item)
}

// UpdateAvailabilityWebsite godoc
// @Summary Update Website Availability
// @Tags AvailabilityWebsite
// @Accept json
// @Produce json
// @Param id path int true "ID"
// @Param data body model.AvailabilityWebsite true "Website Availability"
// @Success 200 {object} model.AvailabilityWebsite
// @Security BearerAuth
// @Router /api/v1.0/services/availability/website/{id} [put]
func UpdateAvailabilityWebsite(c *fiber.Ctx) error {
    var item model.AvailabilityWebsite
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

// DeleteAvailabilityWebsite godoc
// @Summary Delete Website Availability
// @Tags AvailabilityWebsite
// @Param id path int true "ID"
// @Success 204
// @Security BearerAuth
// @Router /api/v1.0/services/availability/website/{id} [delete]
func DeleteAvailabilityWebsite(c *fiber.Ctx) error {
    id := c.Params("id")
    if err := database.DB.Delete(&model.AvailabilityWebsite{}, id).Error; err != nil {
        return c.Status(500).JSON(fiber.Map{"error": err.Error()})
    }
    return c.SendStatus(204)
}
