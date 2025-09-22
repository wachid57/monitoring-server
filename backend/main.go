package main

import (
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/session"
	"monitoring-server/database"
	"monitoring-server/database/migration"
	"monitoring-server/cors"
	"monitoring-server/router"
	"monitoring-server/handler"
	redisSession "monitoring-server/session"
	"log"
	_ "monitoring-server/docs"
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
	
	// Initialize Redis (optional - graceful fallback if Redis is not available)
	if err := redisSession.InitRedis(); err != nil {
		log.Printf("Redis not available, falling back to stateless JWT: %v", err)
	} else {
		log.Println("Redis session management initialized")
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
