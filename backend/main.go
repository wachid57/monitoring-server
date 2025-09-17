package main

import (
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/session"
	"mini-npm-backend/database"
	"mini-npm-backend/database/migration"
	"mini-npm-backend/cors"
	"mini-npm-backend/router"
	"mini-npm-backend/handler"
	_ "mini-npm-backend/docs"
)

// @title Monitoring Server Backend API
// @BasePath /
// @schemes http https

// @securityDefinitions.apikey BearerAuth
// @in header
// @name Authorization
// @description Enter 'Bearer <token>' to authenticate API requests

// @securityDefinitions.apikey BearerAuth
// @in header
// @name Authorization

func main() {
	if err := database.InitDB(); err != nil {
		panic(err)
	}

	app := fiber.New()
	store := session.New()
	swaggerHandler := handler.NewSwaggerHandler(store)

	cors.SetupCORS(app)
	if err := migration.CreateDefaultUser(database.DB); err != nil {
		panic(err)
	}

	app.Get("/", func(c *fiber.Ctx) error {
		return c.SendString("Backend Fiber API running!")
	})

	// Panggil router langsung dengan app
	router.RegisterRoutes(app, swaggerHandler)

	app.Listen(":8080")
}
