package handler

import "github.com/gofiber/fiber/v2"

func DashboardHandler(c *fiber.Ctx) error {
    return c.SendString("Dashboard endpoint (protected)")
}