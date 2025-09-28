package handler

import (
    "github.com/gofiber/fiber/v2"
    "monitoring-server/database"
    "monitoring-server/model"
)

// getUserByUsername helper
func getUserByUsername(username string) (model.User, error) {
    var u model.User
    err := database.DB.Where("username = ?", username).First(&u).Error
    return u, err
}

// GetOwnUserDetail godoc
// @Summary Get own extended user detail
// @Description Returns base user info merged with extended profile detail for authenticated user
// @Tags UserProfile
// @Produce json
// @Success 200 {object} map[string]interface{}
// @Security BearerAuth
// @Router /api/v1.0/account/setting/profiles/user-profile/ [get]
func GetOwnUserDetail(c *fiber.Ctx) error {
    username, _ := c.Locals("username").(string)
    if username == "" {
        return c.Status(401).JSON(fiber.Map{"error": "unauthorized"})
    }
    user, err := getUserByUsername(username)
    if err != nil {
        return c.Status(404).JSON(fiber.Map{"error": "user not found"})
    }
    var detail model.UserDetail
    database.DB.Where("user_id = ?", user.ID).First(&detail)

    // Compose a merged response containing base user info plus extended detail.
    return c.JSON(fiber.Map{
        "id":           user.ID,
        "username":     user.Username,
        "email":        user.Email,
        "name":         user.Name,
        "introduction": detail.Introduction,
        "institution":  detail.Institution,
        "contact_email": detail.ContactEmail,
        "website":      detail.Website,
        "location":     detail.Location,
        "title":        detail.Title,
    })
}

// UpsertOwnUserDetail godoc
// @Summary Upsert own extended user detail
// @Description Creates or updates extended profile fields for authenticated user
// @Tags UserProfile
// @Accept json
// @Produce json
// @Param data body model.UserDetail true "User Detail"
// @Success 200 {object} model.UserDetail
// @Security BearerAuth
// @Router /api/v1.0/account/setting/profiles/user-profile/ [post]
func UpsertOwnUserDetail(c *fiber.Ctx) error {
    username, _ := c.Locals("username").(string)
    if username == "" {
        return c.Status(401).JSON(fiber.Map{"error": "unauthorized"})
    }
    user, err := getUserByUsername(username)
    if err != nil {
        return c.Status(404).JSON(fiber.Map{"error": "user not found"})
    }
    var payload model.UserDetail
    if err := c.BodyParser(&payload); err != nil {
        return c.Status(400).JSON(fiber.Map{"error": err.Error()})
    }
    var existing model.UserDetail
    if err := database.DB.Where("user_id = ?", user.ID).First(&existing).Error; err == nil {
        existing.Introduction = payload.Introduction
        existing.Institution = payload.Institution
        existing.ContactEmail = payload.ContactEmail
        existing.Website = payload.Website
        existing.Location = payload.Location
        existing.Title = payload.Title
        if err := database.DB.Save(&existing).Error; err != nil {
            return c.Status(500).JSON(fiber.Map{"error": err.Error()})
        }
        return c.JSON(existing)
    }
    payload.UserID = user.ID
    if err := database.DB.Create(&payload).Error; err != nil {
        return c.Status(500).JSON(fiber.Map{"error": err.Error()})
    }
    return c.Status(201).JSON(payload)
}
