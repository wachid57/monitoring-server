package handler

import "github.com/gofiber/fiber/v2"

// DashboardHandler godoc
// @Summary Dashboard overview
// @Description Simple protected dashboard endpoint (placeholder)
// @Tags Dashboard
// @Produce plain
// @Success 200 {string} string "Dashboard endpoint (protected)"
// @Security BearerAuth
// @Router /api/v1.0/dashboard [get]
func DashboardHandler(c *fiber.Ctx) error {
    return c.SendString("Dashboard endpoint (protected)")
}