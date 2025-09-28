package main

import (
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/session"
	"monitoring-server/database"
	"monitoring-server/handler"
	"monitoring-server/database/seed"
	redisSession "monitoring-server/session"
	"monitoring-server/cors"
	"monitoring-server/router"
	"log"
	_ "monitoring-server/docs"
	rclient "monitoring-server/redis"
	"monitoring-server/worker"
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
	
	// Initialize Redis for sessions (existing) and generic client
	if err := redisSession.InitRedis(); err != nil {
		log.Printf("Redis (session) not available, fallback to stateless JWT: %v", err)
	} else {
		log.Println("Redis session management initialized")
	}
	if err := rclient.Init(); err != nil {
		log.Printf("Redis (worker) init failed: %v", err)
	} else {
		log.Println("Redis generic client initialized")
	}

	app := fiber.New()
	store := session.New()
	swaggerHandler := handler.NewSwaggerHandler(store)

	cors.SetupCORS(app)
	
	// Ensure default data exists (uses /app/migrate all when DB empty)
	log.Println("Checking and initializing default data (users, roles, permissions)...")
	if err := handler.InitDefaultData(database.DB); err != nil {
		log.Printf("Failed to initialize default data: %v", err)
		panic(err)
	}
	log.Println("Default data initialization completed.")

	// Seed all settings (system + user) idempotently
	if err := seed.SeedAll(); err != nil {
		log.Printf("Failed running seeders: %v", err)
	}

	app.Get("/", func(c *fiber.Ctx) error {
		return c.SendString("Backend Fiber API running!")
	})

	// Register routes
	router.RegisterRoutes(app, swaggerHandler)

	// Start ICMP worker (non-blocking)
	stopCh := make(chan struct{})
	worker.StartICMPWorker(stopCh)

	app.Listen(":8080")
}
