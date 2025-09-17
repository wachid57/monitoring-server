package handler

import (
    "github.com/gofiber/fiber/v2"
    "mini-npm-backend/model"
    "mini-npm-backend/database"
)

// GetHosts godoc
// @Summary Get all hosts
// @Tags Hosts
// @Produce json
// @Success 200 {array} model.Host
// @Security BearerAuth
// @Router /api/v1.0/hosts [get]
func GetHosts(c *fiber.Ctx) error {
    var hosts []model.Host
    if err := database.DB.Find(&hosts).Error; err != nil {
        return c.Status(500).JSON(fiber.Map{"error": "Failed to fetch hosts"})
    }
    return c.JSON(hosts)
}

// CreateHost godoc
// @Summary Create a new host
// @Tags Hosts
// @Accept json
// @Produce json
// @Param host body model.Host true "Host data"
// @Success 200 {object} model.Host
// @Failure 400 {object} map[string]string
// @Failure 500 {object} map[string]string
// @Security BearerAuth
// @Router /api/v1.0/hosts [post]
func CreateHost(c *fiber.Ctx) error {
    var host model.Host
    if err := c.BodyParser(&host); err != nil {
        return c.Status(400).JSON(fiber.Map{"error": "Invalid request"})
    }
    if err := database.DB.Create(&host).Error; err != nil {
        return c.Status(500).JSON(fiber.Map{"error": "Failed to create host"})
    }
    return c.JSON(host)
}

// GetHostByID godoc
// @Summary Get host by ID
// @Tags Hosts
// @Produce json
// @Param id path int true "Host ID"
// @Success 200 {object} model.Host
// @Failure 404 {object} map[string]string
// @Security BearerAuth
// @Router /api/v1.0/hosts/{id} [get]
func GetHostByID(c *fiber.Ctx) error {
    var host model.Host
    id := c.Params("id")
    if err := database.DB.First(&host, id).Error; err != nil {
        return c.Status(404).JSON(fiber.Map{"error": "Host not found"})
    }
    return c.JSON(host)
}

// UpdateHost godoc
// @Summary Update host by ID
// @Tags Hosts
// @Accept json
// @Produce json
// @Param id path int true "Host ID"
// @Param host body model.Host true "Host data"
// @Success 200 {object} model.Host
// @Failure 400 {object} map[string]string
// @Failure 404 {object} map[string]string
// @Failure 500 {object} map[string]string
// @Security BearerAuth
// @Router /api/v1.0/hosts/{id} [put]
func UpdateHost(c *fiber.Ctx) error {
    var host model.Host
    id := c.Params("id")
    if err := database.DB.First(&host, id).Error; err != nil {
        return c.Status(404).JSON(fiber.Map{"error": "Host not found"})
    }
    if err := c.BodyParser(&host); err != nil {
        return c.Status(400).JSON(fiber.Map{"error": "Invalid request"})
    }
    if err := database.DB.Save(&host).Error; err != nil {
        return c.Status(500).JSON(fiber.Map{"error": "Failed to update host"})
    }
    return c.JSON(host)
}

// DeleteHost godoc
// @Summary Delete host by ID
// @Tags Hosts
// @Param id path int true "Host ID"
// @Success 204
// @Failure 500 {object} map[string]string
// @Security BearerAuth
// @Router /api/v1.0/hosts/{id} [delete]
func DeleteHost(c *fiber.Ctx) error {
    id := c.Params("id")
    if err := database.DB.Delete(&model.Host{}, id).Error; err != nil {
        return c.Status(500).JSON(fiber.Map{"error": "Failed to delete host"})
    }
    return c.SendStatus(204)
}