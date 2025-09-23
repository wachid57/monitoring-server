package router

import (
    "github.com/gofiber/fiber/v2"
    "monitoring-server/auth"
    "monitoring-server/middlewares"
    "monitoring-server/handler"
)

func RegisterRoutes(app *fiber.App, swaggerHandler *handler.SwaggerHandler) {
    // Non-protected endpoints
    app.Get("/healtz", func(c *fiber.Ctx) error {
        return c.SendStatus(200)
    })

    // API endpoints under /api/v1.0/auth
    authGroup := app.Group("/api/v1.0/auth")
    authGroup.Post("/login", auth.LoginHandler)
    authGroup.Post("/register", auth.RegisterHandler)
    
    // Protected auth endpoints
    authProtected := authGroup.Group("/", middlewares.JwtMiddleware)
    authProtected.Post("/logout", auth.LogoutHandler)
    authProtected.Post("/change-password", auth.ChangePasswordHandler)
    authProtected.Get("/sessions", auth.GetActiveSessionsHandler)

    // Protected endpoints
    protected := app.Group("/api/v1.0/", middlewares.JwtMiddleware)
    {
        // Dashboard endpoint
        protected.Get("/dashboard", handler.DashboardHandler)

        // CRUD endpoints for users, roles, groups, role bindings
    usersGroup := protected.Group("users")
    usersGroup.Get("/", handler.GetUsers)
    usersGroup.Post("/", handler.CreateUser)

        // CRUD Role
        usersGroup.Get("/roles", handler.GetRoles)
        usersGroup.Post("/roles", handler.CreateRole)
        usersGroup.Get("/roles/:id", handler.GetRoleByID)
        usersGroup.Put("/roles/:id", handler.UpdateRole)
        usersGroup.Delete("/roles/:id", handler.DeleteRole)

        // User-role assignments (list and assign)
        usersGroup.Get("/roles/users", handler.GetUserRoleAssignments)
        usersGroup.Post("/roles/users", handler.AssignRoleToUserAPI)

        // Role bindings accessible under users/roles/binding
        usersGroup.Get("/roles/binding", handler.GetRoleBindings)
        usersGroup.Post("/roles/binding", handler.CreateRoleBinding)
        usersGroup.Get("/roles/binding/:id", handler.GetRoleBindingByID)
        usersGroup.Put("/roles/binding/:id", handler.UpdateRoleBinding)
        usersGroup.Delete("/roles/binding/:id", handler.DeleteRoleBinding)

        // Role-permission management accessible under users/roles/permission
        usersGroup.Get("/roles/permission/:id", handler.GetRolePermissions)
        usersGroup.Post("/roles/permission/:roleId/:permissionId", handler.AssignPermissionToRole)
        usersGroup.Delete("/roles/permission/:roleId/:permissionId", handler.RemovePermissionFromRole)

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

        // CRUD Permissions
        permissionsGroup := protected.Group("permissions")
        permissionsGroup.Get("/", handler.GetPermissions)
        permissionsGroup.Post("/", handler.CreatePermission)
        permissionsGroup.Get("/:id", handler.GetPermission)
        permissionsGroup.Put("/:id", handler.UpdatePermission)
        permissionsGroup.Delete("/:id", handler.DeletePermission)

        // Also expose permissions under users/permissions for symmetry
        usersGroup.Get("/permissions", handler.GetPermissions)
        usersGroup.Post("/permissions", handler.CreatePermission)
        usersGroup.Get("/permissions/:id", handler.GetPermission)
        usersGroup.Put("/permissions/:id", handler.UpdatePermission)
        usersGroup.Delete("/permissions/:id", handler.DeletePermission)

        // Role-Permission Management
        rolesGroup := protected.Group("roles")
        rolesGroup.Get("/:id/permissions", handler.GetRolePermissions)
        rolesGroup.Post("/:roleId/permissions/:permissionId", handler.AssignPermissionToRole)
        rolesGroup.Delete("/:roleId/permissions/:permissionId", handler.RemovePermissionFromRole)

        // Parameterized user routes (must be registered after static subroutes)
        usersGroup.Get("/:id", handler.GetUserByID)
        usersGroup.Put("/:id", handler.UpdateUser)
        usersGroup.Delete("/:id", handler.DeleteUser)

        // CRUD Host Group
        hostGroups := protected.Group("hosts/groups")
        hostGroups.Get("/", handler.GetHostGroups)
        hostGroups.Post("/", handler.CreateHostGroup)
        hostGroups.Get("/:id", handler.GetHostGroupByID)
        hostGroups.Put("/:id", handler.UpdateHostGroup)
        hostGroups.Delete("/:id", handler.DeleteHostGroup)

        // Also expose the same ICMP and Website handlers under a monitoring-friendly path
        // so frontend can call /api/v1.0/monitoring/hosts/icmp and /api/v1.0/monitoring/hosts/website
        monitoringHosts := protected.Group("monitoring/hosts")
        {
            // CRUD Hosts (list/add/get/update/delete)
            hostsMon := monitoringHosts.Group("")
            hostsMon.Get("/", handler.GetHosts)
            hostsMon.Post("/", handler.CreateHost)
            hostsMon.Get("/:id", handler.GetHostByID)
            hostsMon.Put("/:id", handler.UpdateHost)
            hostsMon.Delete("/:id", handler.DeleteHost)

            // ICMP under /api/v1.0/monitoring/hosts/icmp
            icmpMon := monitoringHosts.Group("icmp")
            icmpMon.Get("/", handler.GetICMPServices)
            icmpMon.Post("/", handler.CreateICMPService)
            icmpMon.Get("/:id", handler.GetICMPServiceByID)
            icmpMon.Put("/:id", handler.UpdateICMPService)
            icmpMon.Delete("/:id", handler.DeleteICMPService)

            // Website under /api/v1.0/monitoring/hosts/website
            websiteMon := monitoringHosts.Group("website")
            websiteMon.Get("/", handler.GetAvailabilityWebsites)
            websiteMon.Post("/", handler.CreateAvailabilityWebsite)
            websiteMon.Get("/:id", handler.GetAvailabilityWebsiteByID)
            websiteMon.Put("/:id", handler.UpdateAvailabilityWebsite)
            websiteMon.Delete("/:id", handler.DeleteAvailabilityWebsite)
        }


        // CRUD ICMP Service
        icmpGroup := protected.Group("services/availability/icmp")
        icmpGroup.Get("/", handler.GetICMPServices)
        icmpGroup.Post("/", handler.CreateICMPService)
        icmpGroup.Get("/:id", handler.GetICMPServiceByID)
        icmpGroup.Put("/:id", handler.UpdateICMPService)
        icmpGroup.Delete("/:id", handler.DeleteICMPService)

        // CRUD Availability Website
        availabilityWebsiteGroup := protected.Group("services/availability/website")
        availabilityWebsiteGroup.Get("/", handler.GetAvailabilityWebsites)
        availabilityWebsiteGroup.Post("/", handler.CreateAvailabilityWebsite)
        availabilityWebsiteGroup.Get("/:id", handler.GetAvailabilityWebsiteByID)
        availabilityWebsiteGroup.Put("/:id", handler.UpdateAvailabilityWebsite)
        availabilityWebsiteGroup.Delete("/:id", handler.DeleteAvailabilityWebsite)


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

        // Contact API: expose contact groups and notifications under /api/v1.0/contact
        contact := protected.Group("contact")

        // CRUD Contact Groups -> /api/v1.0/contact/groups
        contactGroups := contact.Group("groups")
        contactGroups.Get("/", handler.GetContactGroups)
        contactGroups.Post("/", handler.CreateContactGroup)
        contactGroups.Get("/:id", handler.GetContactGroupByID)
        contactGroups.Put("/:id", handler.UpdateContactGroup)
        contactGroups.Delete("/:id", handler.DeleteContactGroup)

        // CRUD Notifications -> /api/v1.0/contact/notifications
        notifications := contact.Group("notifications")
        notifications.Get("/", handler.GetNotifications)
        notifications.Post("/", handler.CreateNotification)
        notifications.Get("/:id", handler.GetNotificationByID)
        notifications.Put("/:id", handler.UpdateNotification)
        notifications.Delete("/:id", handler.DeleteNotification)


        // CRUD Aknowledged
        aknowledgedGroup := protected.Group("monitoring/aknowledged")
        aknowledgedGroup.Get("/", handler.GetAknowledged)
        aknowledgedGroup.Post("/", handler.CreateAknowledged)
        aknowledgedGroup.Get("/:id", handler.GetAknowledgedByID)
        aknowledgedGroup.Put("/:id", handler.UpdateAknowledged)
        aknowledgedGroup.Delete("/:id", handler.DeleteAknowledged)

        // CRUD Profile Setting
        profileSettingGroup := protected.Group("profiles/settings")
        profileSettingGroup.Get("/", handler.GetProfileSettings)
        profileSettingGroup.Post("/", handler.CreateProfileSetting)
        profileSettingGroup.Get("/:id", handler.GetProfileSettingByID)
        profileSettingGroup.Put("/:id", handler.UpdateProfileSetting)
        profileSettingGroup.Delete("/:id", handler.DeleteProfileSetting)

        // CRUD Report Manual
        reportManualGroup := protected.Group("reports/manual")
        reportManualGroup.Get("/", handler.GetReportManuals)
        reportManualGroup.Post("/", handler.CreateReportManual)
        reportManualGroup.Get("/:id", handler.GetReportManualByID)
        reportManualGroup.Put("/:id", handler.UpdateReportManual)
        reportManualGroup.Delete("/:id", handler.DeleteReportManual)

        // CRUD Report Automatic
        reportAutomaticGroup := protected.Group("reports/automatic")
        reportAutomaticGroup.Get("/", handler.GetReportAutomatics)
        reportAutomaticGroup.Post("/", handler.CreateReportAutomatic)
        reportAutomaticGroup.Get("/:id", handler.GetReportAutomaticByID)
        reportAutomaticGroup.Put("/:id", handler.UpdateReportAutomatic)
        reportAutomaticGroup.Delete("/:id", handler.DeleteReportAutomatic)

    }

    // Docs endpoints under /docs/v1.0
    docsGroup := app.Group("/docs/v1.0")
    docsGroup.Get("/login", swaggerHandler.LoginPage)
    docsGroup.Post("/login", swaggerHandler.Login)
    docsGroup.Get("/logout", swaggerHandler.Logout)
    docsGroup.Get("/*", swaggerHandler.Docs)
}