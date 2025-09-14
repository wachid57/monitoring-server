package router

import (
    "github.com/gofiber/fiber/v2"
    "mini-npm-backend/auth"
    "mini-npm-backend/middlewares"
    "mini-npm-backend/handler"
)

func RegisterRoutes(app fiber.Router) {
	
    // Non-protected endpoints
    app.Get("/healtz", func(c *fiber.Ctx) error {
        return c.SendStatus(200)
    })

    authGroup := app.Group("/auth")
    authGroup.Post("/login", auth.LoginHandler)
    authGroup.Post("/logout", auth.LogoutHandler)
    authGroup.Post("/register", auth.RegisterHandler) // Incorporating the suggested code change

    // Protected endpoints
    protected := app.Group("/", middlewares.JwtMiddleware)
    {
        // Dashboard endpoint
        protected.Get("/dashboard", func(c *fiber.Ctx) error {
            return c.SendString("Dashboard endpoint (protected)")
        })

        // Proxy management endpoints
        protected.Get("/proxies", handler.GetProxies)
        protected.Post("/proxies", handler.AddProxy)
        protected.Delete("/proxies/:id", handler.DeleteProxy)

        // SSL endpoints
        protected.Post("/ssl/generate", handler.GenerateSSL)
        protected.Get("/ssl/list", handler.ListSSL)
    }
}