package handler

import (
    "github.com/gofiber/fiber/v2"
    "mini-npm-backend/model"
    "mini-npm-backend/database"
)

// GetProfileSettings godoc
// @Summary List Profile Settings
// @Tags ProfileSetting
// @Produce json
// @Success 200 {array} model.ProfileSetting
// @Security BearerAuth
// @Router /api/v1.0/profiles/settings/ [get]
func GetProfileSettings(c *fiber.Ctx) error {
    var settings []model.ProfileSetting
    if err := database.DB.Find(&settings).Error; err != nil {
        return c.Status(500).JSON(fiber.Map{"error": err.Error()})
    }
    return c.JSON(settings)
}

// CreateProfileSetting godoc
// @Summary Create Profile Setting
// @Tags ProfileSetting
// @Accept json
// @Produce json
// @Param data body model.ProfileSetting true "Profile Setting"
// @Success 200 {object} model.ProfileSetting
// @Security BearerAuth
// @Router /api/v1.0/profiles/settings/ [post]
func CreateProfileSetting(c *fiber.Ctx) error {
    var setting model.ProfileSetting
    if err := c.BodyParser(&setting); err != nil {
        return c.Status(400).JSON(fiber.Map{"error": err.Error()})
    }
    if err := database.DB.Create(&setting).Error; err != nil {
        return c.Status(500).JSON(fiber.Map{"error": err.Error()})
    }
    return c.JSON(setting)
}

// GetProfileSettingByID godoc
// @Summary Get Profile Setting by ID
// @Tags ProfileSetting
// @Produce json
// @Param id path int true "ID"
// @Success 200 {object} model.ProfileSetting
// @Security BearerAuth
// @Router /api/v1.0/profiles/settings/{id} [get]
func GetProfileSettingByID(c *fiber.Ctx) error {
    var setting model.ProfileSetting
    id := c.Params("id")
    if err := database.DB.First(&setting, id).Error; err != nil {
        return c.Status(404).JSON(fiber.Map{"error": "Not found"})
    }
    return c.JSON(setting)
}

// UpdateProfileSetting godoc
// @Summary Update Profile Setting
// @Tags ProfileSetting
// @Accept json
// @Produce json
// @Param id path int true "ID"
// @Param data body model.ProfileSetting true "Profile Setting"
// @Success 200 {object} model.ProfileSetting
// @Security BearerAuth
// @Router /api/v1.0/profiles/settings/{id} [put]
func UpdateProfileSetting(c *fiber.Ctx) error {
    var setting model.ProfileSetting
    id := c.Params("id")
    if err := database.DB.First(&setting, id).Error; err != nil {
        return c.Status(404).JSON(fiber.Map{"error": "Not found"})
    }
    if err := c.BodyParser(&setting); err != nil {
        return c.Status(400).JSON(fiber.Map{"error": err.Error()})
    }
    if err := database.DB.Save(&setting).Error; err != nil {
        return c.Status(500).JSON(fiber.Map{"error": err.Error()})
    }
    return c.JSON(setting)
}

// DeleteProfileSetting godoc
// @Summary Delete Profile Setting
// @Tags ProfileSetting
// @Param id path int true "ID"
// @Success 204
// @Security BearerAuth
// @Router /api/v1.0/profiles/settings/{id} [delete]
func DeleteProfileSetting(c *fiber.Ctx) error {
    id := c.Params("id")
    if err := database.DB.Delete(&model.ProfileSetting{}, id).Error; err != nil {
        return c.Status(500).JSON(fiber.Map{"error": err.Error()})
    }
    return c.SendStatus(204)
}
