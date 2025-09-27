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

    // CRUD Role (order matters: static paths before ":id" to avoid shadowing)
    usersGroup.Get("/roles", handler.GetRoles)

    // User-role assignments (list and assign) - must come before /roles/:id
    usersGroup.Get("/roles/users", handler.GetUserRoleAssignments)
    usersGroup.Post("/roles/users", handler.AssignRoleToUserAPI)

    // Role bindings accessible under users/roles/bindings - before /roles/:id
    usersGroup.Get("/roles/bindings", handler.GetRoleBindings)
    usersGroup.Post("/roles/bindings", handler.CreateRoleBinding)
    usersGroup.Get("/roles/bindings/:id", handler.GetRoleBindingByID)
    usersGroup.Put("/roles/bindings/:id", handler.UpdateRoleBinding)
    usersGroup.Delete("/roles/bindings/:id", handler.DeleteRoleBinding)

    // Parametric role routes after static subpaths
    usersGroup.Post("/roles", handler.CreateRole)
    usersGroup.Get("/roles/:id", handler.GetRoleByID)
    usersGroup.Put("/roles/:id", handler.UpdateRole)
    usersGroup.Delete("/roles/:id", handler.DeleteRole)

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

        // CRUD Permissions
        permissionsGroup := protected.Group("permissions")
        permissionsGroup.Get("/", handler.GetPermissions)
        permissionsGroup.Post("/", handler.CreatePermission)
        permissionsGroup.Get("/:id", handler.GetPermission)
        permissionsGroup.Put("/:id", handler.UpdatePermission)
        permissionsGroup.Delete("/:id", handler.DeletePermission)

        // Admin aliases for permissions (requested frontend paths)
        adminGroup := protected.Group("admin")
        adminGroup.Get("/permissions/list", handler.GetPermissions)
        adminGroup.Get("/permissions/bindings", handler.GetPermissions)

    // Admin aliases for roles and bindings (order matters)
    adminGroup.Get("/roles", handler.GetRoles)
    // Bindings first to avoid /roles/:id capturing "bindings"
    adminGroup.Get("/roles/bindings", handler.GetRoleBindings)
    adminGroup.Post("/roles/bindings", handler.CreateRoleBinding)
    adminGroup.Put("/roles/bindings/:id", handler.UpdateRoleBinding)
    adminGroup.Delete("/roles/bindings/:id", handler.DeleteRoleBinding)
    // Parametric role routes after
    adminGroup.Post("/roles", handler.CreateRole)
    adminGroup.Get("/roles/:id", handler.GetRoleByID)
    adminGroup.Put("/roles/:id", handler.UpdateRole)
    adminGroup.Delete("/roles/:id", handler.DeleteRole)

        // Also expose permissions under users/permissions for symmetry
        usersGroup.Get("/permissions", handler.GetPermissions)
        usersGroup.Post("/permissions", handler.CreatePermission)
        usersGroup.Get("/permissions/:id", handler.GetPermission)
        usersGroup.Put("/permissions/:id", handler.UpdatePermission)
        usersGroup.Delete("/permissions/:id", handler.DeletePermission)

        // User specific routes (place after static subpaths to avoid shadowing)
        usersGroup.Get("/:id", handler.GetUserByID)
        usersGroup.Put("/:id", handler.UpdateUser)
        usersGroup.Delete("/:id", handler.DeleteUser)

        // Role-Permission Management
        rolesGroup := protected.Group("roles")
        rolesGroup.Get("/:id/permissions", handler.GetRolePermissions)
        rolesGroup.Post("/:roleId/permissions/:permissionId", handler.AssignPermissionToRole)
        rolesGroup.Delete("/:roleId/permissions/:permissionId", handler.RemovePermissionFromRole)

    // Host Group Bindings (static, must be registered before /hosts/groups/:id)
    hgb := protected.Group("hosts/groups/bindings")
    hgb.Get("/", handler.GetHostGroupBindings)
    hgb.Post("/", handler.CreateHostGroupBinding)
    hgb.Get("/:id", handler.GetHostGroupBindingByID)
    hgb.Put("/:id", handler.UpdateHostGroupBinding)
    hgb.Delete("/:id", handler.DeleteHostGroupBinding)

    // Also register without trailing slash to handle clients requesting exact path
    protected.Get("hosts/groups/bindings", handler.GetHostGroupBindings)
    protected.Post("hosts/groups/bindings", handler.CreateHostGroupBinding)
    protected.Get("hosts/groups/bindings/:id", handler.GetHostGroupBindingByID)
    protected.Put("hosts/groups/bindings/:id", handler.UpdateHostGroupBinding)
    protected.Delete("hosts/groups/bindings/:id", handler.DeleteHostGroupBinding)

    // CRUD Host Group (register after bindings but before parametric /hosts/:id to avoid shadowing)
    hostGroups := protected.Group("hosts/groups")
        hostGroups.Get("/", handler.GetHostGroups)
        hostGroups.Post("/", handler.CreateHostGroup)
        hostGroups.Get("/:id", handler.GetHostGroupByID)
        hostGroups.Put("/:id", handler.UpdateHostGroup)
        hostGroups.Delete("/:id", handler.DeleteHostGroup)

    // CRUD Host
    hostsGroup := protected.Group("hosts")
    hostsGroup.Get("/", handler.GetHosts)
    hostsGroup.Post("/", handler.CreateHost)
    // Place param routes after all static subpaths under /hosts to avoid capturing them
    hostsGroup.Get("/:id", handler.GetHostByID)
    hostsGroup.Put("/:id", handler.UpdateHost)
    hostsGroup.Delete("/:id", handler.DeleteHost)

    // Infrastructure API aliases for hosts (frontend may use /infrastructure/hosts/...)
    infrastructureGroup := protected.Group("infrastructure")
    // Register static subpaths first to prevent '/hosts/:id' from capturing them
    infrastructureGroup.Get("/hosts/list", handler.GetHosts)
    // Host Group Bindings under infrastructure alias (register before /hosts/groups/:id)
    infrastructureGroup.Get("/hosts/groups/bindings", handler.GetHostGroupBindings)
    infrastructureGroup.Post("/hosts/groups/bindings", handler.CreateHostGroupBinding)
    infrastructureGroup.Get("/hosts/groups/bindings/:id", handler.GetHostGroupBindingByID)
    infrastructureGroup.Put("/hosts/groups/bindings/:id", handler.UpdateHostGroupBinding)
    infrastructureGroup.Delete("/hosts/groups/bindings/:id", handler.DeleteHostGroupBinding)

    // Host Groups under infrastructure alias
    infrastructureGroup.Get("/hosts/groups", handler.GetHostGroups)
    infrastructureGroup.Post("/hosts/groups", handler.CreateHostGroup)
    infrastructureGroup.Get("/hosts/groups/:id", handler.GetHostGroupByID)
    infrastructureGroup.Put("/hosts/groups/:id", handler.UpdateHostGroup)
    infrastructureGroup.Delete("/hosts/groups/:id", handler.DeleteHostGroup)

    // Then parametric /hosts routes
    infrastructureGroup.Post("/hosts", handler.CreateHost)
    infrastructureGroup.Get("/hosts/:id", handler.GetHostByID)
    infrastructureGroup.Put("/hosts/:id", handler.UpdateHost)
    infrastructureGroup.Delete("/hosts/:id", handler.DeleteHost)

    // Infrastructure alias for service groups list (read-only for UI listing)
    infrastructureGroup.Get("/services/groups/lists", handler.GetServiceGroups)
    // (Removed '/infrastruktur' alias routes per request)

    // (removed capitalized Infrastruktur alias and duplicate hostGroups block)

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

    // Service Group Bindings
    sgb := protected.Group("services/groups/bindings")
    sgb.Get("/", handler.GetServiceGroupBindings)
    sgb.Post("/", handler.CreateServiceGroupBinding)
    sgb.Get("/:id", handler.GetServiceGroupBindingByID)
    sgb.Put("/:id", handler.UpdateServiceGroupBinding)
    sgb.Delete("/:id", handler.DeleteServiceGroupBinding)

    // Infrastructure alias for service group bindings (none in sidebar, but keep symmetry)
    infrastructureGroup.Get("/services/groups/bindings", handler.GetServiceGroupBindings)
    infrastructureGroup.Post("/services/groups/bindings", handler.CreateServiceGroupBinding)
    infrastructureGroup.Get("/services/groups/bindings/:id", handler.GetServiceGroupBindingByID)
    infrastructureGroup.Put("/services/groups/bindings/:id", handler.UpdateServiceGroupBinding)
    infrastructureGroup.Delete("/services/groups/bindings/:id", handler.DeleteServiceGroupBinding)

    // Admin aliases for permissions already set; add groups alias per menu
    adminGroup.Get("/groups/list", handler.GetGroups)

        // CRUD Contact Groups
        contactGroup := protected.Group("monitoring/contactgroups")
        contactGroup.Get("/", handler.GetContactGroups)
        contactGroup.Post("/", handler.CreateContactGroup)
        contactGroup.Get("/:id", handler.GetContactGroupByID)
        contactGroup.Put("/:id", handler.UpdateContactGroup)
        contactGroup.Delete("/:id", handler.DeleteContactGroup)

        // CRUD Notifications
        notificationGroup := protected.Group("monitoring/notifications")
        notificationGroup.Get("/", handler.GetNotifications)
        notificationGroup.Post("/", handler.CreateNotification)
        notificationGroup.Get("/:id", handler.GetNotificationByID)
        notificationGroup.Put("/:id", handler.UpdateNotification)
        notificationGroup.Delete("/:id", handler.DeleteNotification)


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

    // System Settings (key-value store)
    systemSettings := protected.Group("system/settings")
    systemSettings.Get("/", handler.GetSystemSettings)
    systemSettings.Post("/", handler.UpsertSystemSetting) // upsert by key in body
    systemSettings.Delete("/:key", handler.DeleteSystemSetting)

    }

    // Docs endpoints under /docs/v1.0
    docsGroup := app.Group("/docs/v1.0")
    docsGroup.Get("/login", swaggerHandler.LoginPage)
    docsGroup.Post("/login", swaggerHandler.Login)
    docsGroup.Get("/logout", swaggerHandler.Logout)
    docsGroup.Get("/*", swaggerHandler.Docs)
}