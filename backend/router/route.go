package router

import (
    "github.com/gofiber/fiber/v2"
    "mini-npm-backend/auth"
    "mini-npm-backend/middlewares"
    "mini-npm-backend/backend" // jika handler proxy/ssl ada di package main
)

func RegisterRoutes(app fiber.Router) {
    // Auth endpoints
    authGroup := app.Group("/auth")
    authGroup.Post("/login", auth.LoginHandler)
    // Pastikan LogoutHandler sudah ada di auth.go
    // Jika belum, buat dulu fungsi LogoutHandler di auth.go
    authGroup.Post("/logout", auth.LogoutHandler)

    // Protected routes
    app.Use(middlewares.JwtMiddleware)

    // Dashboard endpoint
    app.Get("/dashboard", func(c *fiber.Ctx) error {
        return c.SendString("Dashboard endpoint (protected)")
    })

    // Proxy management endpoints
    app.Get("/proxies", backend.GetProxies)
    app.Post("/proxies", backend.AddProxy)
    app.Delete("/proxies/:id", backend.DeleteProxy)

    // SSL endpoints
    app.Post("/ssl/generate", backend.GenerateSSL)
    app.Get("/ssl/list", backend.ListSSL)

    // Health check
    app.Get("/", func(c *fiber.Ctx) error {
        return c.SendString("Backend Fiber API running!")
    })
    app.Get("/healtz", func(c *fiber.Ctx) error {
        return c.SendStatus(200)
    })
}