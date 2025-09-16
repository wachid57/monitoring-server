package router

import (
    "github.com/gofiber/fiber/v2"
    "mini-npm-backend/auth"
    "mini-npm-backend/middlewares"
    "mini-npm-backend/handler"
)

func RegisterRoutes(app *fiber.App, swaggerHandler *handler.SwaggerHandler) {
    // Non-protected endpoints
    app.Get("/healtz", func(c *fiber.Ctx) error {
        return c.SendStatus(200)
    })

    // API endpoints under /api/v1.0/auth
    authGroup := app.Group("/api/v1.0/auth")
    authGroup.Post("/login", auth.LoginHandler)
    authGroup.Post("/logout", auth.LogoutHandler)
    authGroup.Post("/register", auth.RegisterHandler)

    // Protected endpoints
    protected := app.Group("/api/v1.0/", middlewares.JwtMiddleware)
    {
        // Dashboard endpoint
        protected.Get("/dashboard", handler.DashboardHandler)

        // CRUD endpoints for users, roles, groups, role bindings
        usersGroup := protected.Group("users")
        usersGroup.Get("/", handler.GetUsers)
        usersGroup.Post("/", handler.CreateUser)
        usersGroup.Get("/:id", handler.GetUserByID)
        usersGroup.Put("/:id", handler.UpdateUser)
        usersGroup.Delete("/:id", handler.DeleteUser)

        // CRUD Role
        usersGroup.Get("/roles", handler.GetRoles)
        usersGroup.Post("/roles", handler.CreateRole)
        usersGroup.Get("/roles/:id", handler.GetRoleByID)
        usersGroup.Put("/roles/:id", handler.UpdateRole)
        usersGroup.Delete("/roles/:id", handler.DeleteRole)

        // CRUD Group
        usersGroup.Get("/groups", handler.GetGroups)
        usersGroup.Post("/groups", handler.CreateGroup)
        usersGroup.Get("/groups/:id", handler.GetGroupByID)
        usersGroup.Put("/groups/:id", handler.UpdateGroup)
        usersGroup.Delete("/groups/:id", handler.DeleteGroup)

        // CRUD Role Binding
        usersGroup.Get("/role-bindings", handler.GetRoleBindings)
        usersGroup.Post("/role-bindings", handler.CreateRoleBinding)
        usersGroup.Get("/role-bindings/:id", handler.GetRoleBindingByID)
        usersGroup.Put("/role-bindings/:id", handler.UpdateRoleBinding)
        usersGroup.Delete("/role-bindings/:id", handler.DeleteRoleBinding)

        // CRUD Host
        hostsGroup := protected.Group("hosts")
        hostsGroup.Get("/", handler.GetHosts)
        hostsGroup.Post("/", handler.CreateHost)
        hostsGroup.Get("/:id", handler.GetHostByID)
        hostsGroup.Put("/:id", handler.UpdateHost)
        hostsGroup.Delete("/:id", handler.DeleteHost)

        // CRUD Host Group
        hostGroups := protected.Group("hosts/groups")
        hostGroups.Get("/", handler.GetHostGroups)
        hostGroups.Post("/", handler.CreateHostGroup)
        hostGroups.Get("/:id", handler.GetHostGroupByID)
        hostGroups.Put("/:id", handler.UpdateHostGroup)
        hostGroups.Delete("/:id", handler.DeleteHostGroup)
    }

    // Docs endpoints under /docs/v1.0
    docsGroup := app.Group("/docs/v1.0")
    docsGroup.Get("/login", swaggerHandler.LoginPage)
    docsGroup.Post("/login", swaggerHandler.Login)
    docsGroup.Get("/logout", swaggerHandler.Logout)
    docsGroup.Get("/*", swaggerHandler.Docs)
}