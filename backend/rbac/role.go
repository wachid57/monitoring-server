package rbac

import (
    "github.com/gofiber/fiber/v2"
    "mini-npm-backend/model"
    "gorm.io/gorm"
)

// RequireRole middleware checks if user has required role
func RequireRole(db *gorm.DB, roleName string) fiber.Handler {
    return func(c *fiber.Ctx) error {
        userID := c.Locals("user_id")
        var user model.User
        if err := db.Preload("Roles").First(&user, userID).Error; err != nil {
            return c.SendStatus(fiber.StatusForbidden)
        }
        for _, role := range user.Roles {
            if role.Name == roleName {
                return c.Next()
            }
        }
        return c.SendStatus(fiber.StatusForbidden)
    }
}