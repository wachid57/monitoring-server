package main

import (
	"github.com/gofiber/fiber/v2"
	"mini-npm-backend/database"
	"mini-npm-backend/database/migration"
	"mini-npm-backend/cors"
	"mini-npm-backend/router"
)

func main() {
	if err := database.InitDB(); err != nil {
		panic(err)
	}

	app := fiber.New()
	cors.SetupCORS(app)
	if err := migration.CreateDefaultUser(database.DB); err != nil {
		panic(err)
	}

	// Health check (root)
	app.Get("/", func(c *fiber.Ctx) error {
		return c.SendString("Backend Fiber API running!")
	})

	// Versioned API group
	api := app.Group("/api/v1.0")

	router.RegisterRoutes(api)

	app.Listen(":8080")
}
