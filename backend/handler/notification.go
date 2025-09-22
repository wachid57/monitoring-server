package handler

import (
    "github.com/gofiber/fiber/v2"
    "monitoring-server/model"
    "monitoring-server/database"
)

// GetNotifications godoc
// @Summary List Notifications
// @Tags Notification
// @Produce json
// @Success 200 {array} model.Notification
// @Security BearerAuth
// @Router /api/v1.0/monitoring/notifications/ [get]
func GetNotifications(c *fiber.Ctx) error {
    var notifs []model.Notification
    if err := database.DB.Find(&notifs).Error; err != nil {
        return c.Status(500).JSON(fiber.Map{"error": err.Error()})
    }
    return c.JSON(notifs)
}

// CreateNotification godoc
// @Summary Create Notification
// @Tags Notification
// @Accept json
// @Produce json
// @Param data body model.Notification true "Notification"
// @Success 200 {object} model.Notification
// @Security BearerAuth
// @Router /api/v1.0/monitoring/notifications/ [post]
func CreateNotification(c *fiber.Ctx) error {
    var notif model.Notification
    if err := c.BodyParser(&notif); err != nil {
        return c.Status(400).JSON(fiber.Map{"error": err.Error()})
    }
    if err := database.DB.Create(&notif).Error; err != nil {
        return c.Status(500).JSON(fiber.Map{"error": err.Error()})
    }
    return c.JSON(notif)
}

// GetNotificationByID godoc
// @Summary Get Notification by ID
// @Tags Notification
// @Produce json
// @Param id path int true "ID"
// @Success 200 {object} model.Notification
// @Security BearerAuth
// @Router /api/v1.0/monitoring/notifications/{id} [get]
func GetNotificationByID(c *fiber.Ctx) error {
    var notif model.Notification
    id := c.Params("id")
    if err := database.DB.First(&notif, id).Error; err != nil {
        return c.Status(404).JSON(fiber.Map{"error": "Not found"})
    }
    return c.JSON(notif)
}

// UpdateNotification godoc
// @Summary Update Notification
// @Tags Notification
// @Accept json
// @Produce json
// @Param id path int true "ID"
// @Param data body model.Notification true "Notification"
// @Success 200 {object} model.Notification
// @Security BearerAuth
// @Router /api/v1.0/monitoring/notifications/{id} [put]
func UpdateNotification(c *fiber.Ctx) error {
    var notif model.Notification
    id := c.Params("id")
    if err := database.DB.First(&notif, id).Error; err != nil {
        return c.Status(404).JSON(fiber.Map{"error": "Not found"})
    }
    if err := c.BodyParser(&notif); err != nil {
        return c.Status(400).JSON(fiber.Map{"error": err.Error()})
    }
    if err := database.DB.Save(&notif).Error; err != nil {
        return c.Status(500).JSON(fiber.Map{"error": err.Error()})
    }
    return c.JSON(notif)
}

// DeleteNotification godoc
// @Summary Delete Notification
// @Tags Notification
// @Param id path int true "ID"
// @Success 204
// @Security BearerAuth
// @Router /api/v1.0/monitoring/notifications/{id} [delete]
func DeleteNotification(c *fiber.Ctx) error {
    id := c.Params("id")
    if err := database.DB.Delete(&model.Notification{}, id).Error; err != nil {
        return c.Status(500).JSON(fiber.Map{"error": err.Error()})
    }
    return c.SendStatus(204)
}
