package main
import (
	"github.com/gofiber/fiber/v2"
	"mini-npm-backend/database"
	"mini-npm-backend/database/migration"
)

func main() {
	if err := database.InitDB(); err != nil {
		panic(err)
	}

	app := fiber.New()
	// Panggil migration untuk create default user
	if err := migration.CreateDefaultUser(database.DB); err != nil {
		panic(err)
	}

	// SSL endpoints
	app.Post("/ssl/generate", generateSSL)
	app.Get("/ssl/list", listSSL)

	// Health check
	app.Get("/", func(c *fiber.Ctx) error {
		return c.SendString("Backend Fiber API running!")
	})

	// Login endpoint
	app.Post("/login", loginHandler)

	// Protected routes
	app.Use(jwtMiddleware)

	// Dashboard endpoint
	app.Get("/dashboard", func(c *fiber.Ctx) error {
		return c.SendString("Dashboard endpoint (protected)")
	})

	// Proxy management endpoints
	app.Get("/proxies", getProxies)
	app.Post("/proxies", addProxy)
	app.Delete("/proxies/:id", deleteProxy)

	app.Listen(":8080")
}
