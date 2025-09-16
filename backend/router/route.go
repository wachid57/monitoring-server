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

        // CRUD ICMP Service
        icmpGroup := protected.Group("services/availability/icmp")
        icmpGroup.Get("/", handler.GetICMPServices)
        icmpGroup.Post("/", handler.CreateICMPService)
        icmpGroup.Get("/:id", handler.GetICMPServiceByID)
        icmpGroup.Put("/:id", handler.UpdateICMPService)
        icmpGroup.Delete("/:id", handler.DeleteICMPService)

        // CRUD Metric CPU
        cpuGroup := protected.Group("services/metrics/cpu")
        cpuGroup.Get("/", handler.GetCPUMetrics)
        cpuGroup.Post("/", handler.CreateCPUMetric)
        cpuGroup.Get("/:id", handler.GetCPUMetricByID)
        cpuGroup.Put("/:id", handler.UpdateCPUMetric)
        cpuGroup.Delete("/:id", handler.DeleteCPUMetric)

        // CRUD Metric Memory
        memoryGroup := protected.Group("services/metrics/memory")
        memoryGroup.Get("/", handler.GetMemoryMetrics)
        memoryGroup.Post("/", handler.CreateMemoryMetric)
        memoryGroup.Get("/:id", handler.GetMemoryMetricByID)
        memoryGroup.Put("/:id", handler.UpdateMemoryMetric)
        memoryGroup.Delete("/:id", handler.DeleteMemoryMetric)

        // CRUD Metric Disk
        diskGroup := protected.Group("services/metrics/disk")
        diskGroup.Get("/", handler.GetDiskMetrics)
        diskGroup.Post("/", handler.CreateDiskMetric)
        diskGroup.Get("/:id", handler.GetDiskMetricByID)
        diskGroup.Put("/:id", handler.UpdateDiskMetric)
        diskGroup.Delete("/:id", handler.DeleteDiskMetric)

        // CRUD Service Group
        serviceGroup := protected.Group("services/groups")
        serviceGroup.Get("/", handler.GetServiceGroups)
        serviceGroup.Post("/", handler.CreateServiceGroup)
        serviceGroup.Get("/:id", handler.GetServiceGroupByID)
        serviceGroup.Put("/:id", handler.UpdateServiceGroup)
        serviceGroup.Delete("/:id", handler.DeleteServiceGroup)

    }

    // Docs endpoints under /docs/v1.0
    docsGroup := app.Group("/docs/v1.0")
    docsGroup.Get("/login", swaggerHandler.LoginPage)
    docsGroup.Post("/login", swaggerHandler.Login)
    docsGroup.Get("/logout", swaggerHandler.Logout)
    docsGroup.Get("/*", swaggerHandler.Docs)
}