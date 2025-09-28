package router

import (
    "github.com/gofiber/fiber/v2"
    "monitoring-server/auth"
    "monitoring-server/middlewares"
    "monitoring-server/handler"
)

// Unified route registration (cleaned duplicate definitions)
func RegisterRoutes(app *fiber.App, swaggerHandler *handler.SwaggerHandler) {
        // ---------------------------------------------------------------------
        //  Public & Auth Routes
        // ---------------------------------------------------------------------

        // Simple health probe (used by container / k8s liveness)
        app.Get("/healtz", func(c *fiber.Ctx) error { return c.SendStatus(200) })

        // Authentication (public) endpoints under versioned prefix
        authGroup := app.Group("/api/v1.0/auth")
        authGroup.Post("/login", auth.LoginHandler)
        authGroup.Post("/register", auth.RegisterHandler)

        // Authenticated auth utilities (logout, change password, session listing)
        authProtected := authGroup.Group("/", middlewares.JwtMiddleware)
        authProtected.Post("/logout", auth.LogoutHandler)
        authProtected.Post("/change-password", auth.ChangePasswordHandler)
        authProtected.Get("/sessions", auth.GetActiveSessionsHandler)

        // ---------------------------------------------------------------------
        //  Protected API (all business endpoints) - /api/v1.0/*
        // ---------------------------------------------------------------------
        protected := app.Group("/api/v1.0/", middlewares.JwtMiddleware)
        {
            // Dashboard summary metrics
            protected.Get("/dashboard", handler.DashboardHandler)

            // -----------------------------------------------------------------
            //  Users Domain (ONLY user CRUD + groups here)
            //  NOTE: Role & Permission management moved to /admin for clarity.
            //  Deprecated legacy role endpoints under /users retained temporarily
            //  to avoid breaking older frontends; remove after migration.
            // -----------------------------------------------------------------
            usersGroup := protected.Group("users")

            // User Groups (organizational grouping of users)
            usersGroup.Get("/groups", handler.GetGroups)
            usersGroup.Post("/groups", handler.CreateGroup)
            usersGroup.Get("/groups/:id", handler.GetGroupByID)
            usersGroup.Put("/groups/:id", handler.UpdateGroup)
            usersGroup.Delete("/groups/:id", handler.DeleteGroup)

            // LEGACY ROLE ASSIGNMENT ENDPOINTS (to be removed after frontend migration)
            usersGroup.Get("/", handler.GetUsers)
            usersGroup.Post("/", handler.CreateUser)

            // -----------------------------------------------------------------
            //  Admin Domain (/admin) - centralized RBAC (roles, permissions)
            // -----------------------------------------------------------------
        // Group: /api/v1.0/admin -> Centralized RBAC (roles, permissions, bindings)
                adminUsersGroup := protected.Group("admin/users")
                // Admin Users (preferred new path for user CRUD & role assignment)
                // Support both '/api/v1.0/admin/users' and '/api/v1.0/admin/users/'

                // ROLE ASSIGNMENT ALIAS (mirrors /admin/roles/users)
                adminUsersGroup.Get("/roles/users", handler.GetUserRoleAssignments)
                adminUsersGroup.Post("/roles/users", handler.AssignRoleToUserAPI)

                // GROUP ASSIGNMENTS (user <-> groups) under admin users namespace
                adminUsersGroup.Get("/groups/users", handler.GetUserGroupAssignments)
                adminUsersGroup.Post("/groups/users", handler.AssignGroupsToUserAPI)
                
                // DETAIL CRUD
                adminUsersGroup.Get("/:id", handler.GetUserByID)
                adminUsersGroup.Put("/:id", handler.UpdateUser)
                adminUsersGroup.Delete("/:id", handler.DeleteUser)

                // LIST & CREATE
                adminUsersGroup.Get("", handler.GetUsers)
                adminUsersGroup.Get("/", handler.GetUsers)
                adminUsersGroup.Post("", handler.CreateUser)
                adminUsersGroup.Post("/", handler.CreateUser)

            // Centralized admin group for all RBAC management
        // Group: /api/v1.0/admin -> Centralized RBAC management
        adminGroup := protected.Group("admin")

            // Permissions CRUD (/admin/permissions) - ordered longest path -> shortest
            adminGroup.Get("/permissions/:id", handler.GetPermission)
            adminGroup.Put("/permissions/:id", handler.UpdatePermission)
            adminGroup.Delete("/permissions/:id", handler.DeletePermission)
            adminGroup.Post("/permissions", handler.CreatePermission)
            adminGroup.Get("/permissions", handler.GetPermissions)

            // Role Bindings (user <-> role mapping) & listing (canonical paths only)
            adminGroup.Get("/roles/bindings/:id", handler.GetRoleBindingByID)
            adminGroup.Put("/roles/bindings/:id", handler.UpdateRoleBinding)
            adminGroup.Delete("/roles/bindings/:id", handler.DeleteRoleBinding)
            adminGroup.Post("/roles/bindings", handler.CreateRoleBinding)
            adminGroup.Get("/roles/bindings", handler.GetRoleBindings)

            // User-role assignments (simple assign/list) alias under admin (canonical)
            adminGroup.Post("/roles/users", handler.AssignRoleToUserAPI)
            adminGroup.Get("/roles/users", handler.GetUserRoleAssignments)

            // Role-Permission linking semantics (longest -> shorter)
            adminGroup.Post("/roles/:roleId/permissions/:permissionId", handler.AssignPermissionToRole)
            adminGroup.Delete("/roles/:roleId/permissions/:permissionId", handler.RemovePermissionFromRole)
            adminGroup.Get("/roles/:id/permissions", handler.GetRolePermissions)

            // Dynamic role operations (canonical)
            adminGroup.Get("/roles/:id", handler.GetRoleByID)
            adminGroup.Put("/roles/:id", handler.UpdateRole)
            adminGroup.Delete("/roles/:id", handler.DeleteRole)

            // Roles CRUD base (canonical)
            adminGroup.Post("/roles", handler.CreateRole)
            adminGroup.Get("/roles", handler.GetRoles)

            // Remove direct CRUD under /admin/users/roles to enforce single canonical path (/admin/roles)

            // User-group assignments (listing & replace semantics)
            adminGroup.Get("/groups/users", handler.GetUserGroupAssignments)
            adminGroup.Post("/groups/users", handler.AssignGroupsToUserAPI)

            // (Role-Permission & Roles CRUD moved above for ordered grouping)


            // Provide groups listing for admin menus
            adminGroup.Get("/groups/list", handler.GetGroups)

            // -----------------------------------------------------------------
            //  Host Group Bindings (explicit path before host groups)
            // -----------------------------------------------------------------
        // Group: /api/v1.0/hosts/groups/bindings -> HostGroup <-> Host relations (primary path)
        hgb := protected.Group("hosts/groups/bindings")
            hgb.Get("/", handler.GetHostGroupBindings)
            hgb.Post("/", handler.CreateHostGroupBinding)
            hgb.Get("/:id", handler.GetHostGroupBindingByID)
            hgb.Put("/:id", handler.UpdateHostGroupBinding)
            hgb.Delete("/:id", handler.DeleteHostGroupBinding)

            // Backwards compatibility (paths without trailing slash)
            protected.Get("hosts/groups/bindings", handler.GetHostGroupBindings)
            protected.Post("hosts/groups/bindings", handler.CreateHostGroupBinding)
            protected.Get("hosts/groups/bindings/:id", handler.GetHostGroupBindingByID)
            protected.Put("hosts/groups/bindings/:id", handler.UpdateHostGroupBinding)
            protected.Delete("hosts/groups/bindings/:id", handler.DeleteHostGroupBinding)

            // Host Groups CRUD (registered after bindings to avoid shadow capture)
        // Group: /api/v1.0/hosts/groups -> Host Group CRUD (after bindings to avoid shadowing)
        hostGroups := protected.Group("hosts/groups")
            hostGroups.Get("/", handler.GetHostGroups)
            hostGroups.Post("/", handler.CreateHostGroup)
            hostGroups.Get("/:id", handler.GetHostGroupByID)
            hostGroups.Put("/:id", handler.UpdateHostGroup)
            hostGroups.Delete("/:id", handler.DeleteHostGroup)

            // -----------------------------------------------------------------
            //  Hosts & Infrastructure Aliases
            // -----------------------------------------------------------------
        // Group: /api/v1.0/hosts -> Host CRUD & services for a single host
        hostsGroup := protected.Group("hosts")
            hostsGroup.Get("/", handler.GetHosts)
            hostsGroup.Post("/", handler.CreateHost)
            hostsGroup.Get("/:id", handler.GetHostByID)
            hostsGroup.Get("/:id/services", handler.GetHostServices)
            hostsGroup.Put("/:id", handler.UpdateHost)
            hostsGroup.Delete("/:id", handler.DeleteHost)

        // Group: /api/v1.0/infrastructure -> Read/Write aliases used by frontend infrastructure module
        infrastructureGroup := protected.Group("infrastructure")
            infrastructureGroup.Get("/hosts/list", handler.GetHosts)
            infrastructureGroup.Get("/hosts/groups/bindings", handler.GetHostGroupBindings)
            infrastructureGroup.Post("/hosts/groups/bindings", handler.CreateHostGroupBinding)
            infrastructureGroup.Get("/hosts/groups/bindings/:id", handler.GetHostGroupBindingByID)
            infrastructureGroup.Put("/hosts/groups/bindings/:id", handler.UpdateHostGroupBinding)
            infrastructureGroup.Delete("/hosts/groups/bindings/:id", handler.DeleteHostGroupBinding)

        // DEPRECATED (use /infrastructure/groups/hosts): legacy host group paths
        infrastructureGroup.Get("/hosts/groups", handler.GetHostGroups)
        infrastructureGroup.Post("/hosts/groups", handler.CreateHostGroup)
        infrastructureGroup.Get("/hosts/groups/:id", handler.GetHostGroupByID)
        infrastructureGroup.Put("/hosts/groups/:id", handler.UpdateHostGroup)
        infrastructureGroup.Delete("/hosts/groups/:id", handler.DeleteHostGroup)

        // New preferred host group paths: /infrastructure/groups/hosts
        infrastructureGroup.Get("/groups/hosts", handler.GetHostGroups)
        infrastructureGroup.Post("/groups/hosts", handler.CreateHostGroup)
        infrastructureGroup.Get("/groups/hosts/:id", handler.GetHostGroupByID)
        infrastructureGroup.Put("/groups/hosts/:id", handler.UpdateHostGroup)
        infrastructureGroup.Delete("/groups/hosts/:id", handler.DeleteHostGroup)

        // Host CRUD & services
            infrastructureGroup.Get("/hosts", handler.GetHosts)
            infrastructureGroup.Post("/hosts", handler.CreateHost)
            infrastructureGroup.Get("/hosts/:id", handler.GetHostByID)
            infrastructureGroup.Get("/hosts/:id/services", handler.GetHostServices)
            infrastructureGroup.Post("/hosts/:id/services/rebuild", handler.RebuildHostServices)
            infrastructureGroup.Post("/hosts/:id/services/ping-refresh", handler.PingRefreshHostServices)
            infrastructureGroup.Put("/hosts/:id", handler.UpdateHost)
            infrastructureGroup.Delete("/hosts/:id", handler.DeleteHost)
            infrastructureGroup.Get("/services/groups/lists", handler.GetServiceGroups)
            infrastructureGroup.Get("/services/host-services", handler.ListAllHostServices)

            // -----------------------------------------------------------------
            //  Services (Availability & Metrics)
            // -----------------------------------------------------------------
        // Group: /api/v1.0/services/availability/icmp -> ICMP check definitions
        icmpGroup := protected.Group("services/availability/icmp")
            icmpGroup.Get("/", handler.GetICMPServices)
            icmpGroup.Post("/", handler.CreateICMPService)
            icmpGroup.Get("/:id", handler.GetICMPServiceByID)
            icmpGroup.Put("/:id", handler.UpdateICMPService)
            icmpGroup.Delete("/:id", handler.DeleteICMPService)

        // Group: /api/v1.0/services/availability/website -> HTTP/Website availability checks
        availabilityWebsiteGroup := protected.Group("services/availability/website")
            availabilityWebsiteGroup.Get("/", handler.GetAvailabilityWebsites)
            availabilityWebsiteGroup.Post("/", handler.CreateAvailabilityWebsite)
            availabilityWebsiteGroup.Get("/:id", handler.GetAvailabilityWebsiteByID)
            availabilityWebsiteGroup.Put("/:id", handler.UpdateAvailabilityWebsite)
            availabilityWebsiteGroup.Delete("/:id", handler.DeleteAvailabilityWebsite)

        // Group: /api/v1.0/services/metrics/cpu -> CPU metric definitions
        cpuGroup := protected.Group("services/metrics/cpu")
            cpuGroup.Get("/", handler.GetCPUMetrics)
            cpuGroup.Post("/", handler.CreateCPUMetric)
            cpuGroup.Get("/:id", handler.GetCPUMetricByID)
            cpuGroup.Put("/:id", handler.UpdateCPUMetric)
            cpuGroup.Delete("/:id", handler.DeleteCPUMetric)

        // Group: /api/v1.0/services/metrics/memory -> Memory metric definitions
        memoryGroup := protected.Group("services/metrics/memory")
            memoryGroup.Get("/", handler.GetMemoryMetrics)
            memoryGroup.Post("/", handler.CreateMemoryMetric)
            memoryGroup.Get("/:id", handler.GetMemoryMetricByID)
            memoryGroup.Put("/:id", handler.UpdateMemoryMetric)
            memoryGroup.Delete("/:id", handler.DeleteMemoryMetric)

        // Group: /api/v1.0/services/metrics/disk -> Disk metric definitions
        diskGroup := protected.Group("services/metrics/disk")
            diskGroup.Get("/", handler.GetDiskMetrics)
            diskGroup.Post("/", handler.CreateDiskMetric)
            diskGroup.Get("/:id", handler.GetDiskMetricByID)
            diskGroup.Put("/:id", handler.UpdateDiskMetric)
            diskGroup.Delete("/:id", handler.DeleteDiskMetric)

        // Group: /api/v1.0/services/groups -> Logical grouping of service definitions
        serviceGroup := protected.Group("services/groups")
            serviceGroup.Get("/", handler.GetServiceGroups)
            serviceGroup.Post("/", handler.CreateServiceGroup)
            serviceGroup.Get("/:id", handler.GetServiceGroupByID)
            serviceGroup.Put("/:id", handler.UpdateServiceGroup)
            serviceGroup.Delete("/:id", handler.DeleteServiceGroup)

            // Service Group Bindings (group <-> services) + infrastructure mirror
        // Group: /api/v1.0/services/groups/bindings -> ServiceGroup <-> Services relations
        sgb := protected.Group("services/groups/bindings")
            sgb.Get("/", handler.GetServiceGroupBindings)
            sgb.Post("/", handler.CreateServiceGroupBinding)
            sgb.Get("/:id", handler.GetServiceGroupBindingByID)
            sgb.Put("/:id", handler.UpdateServiceGroupBinding)
            sgb.Delete("/:id", handler.DeleteServiceGroupBinding)
            infrastructureGroup.Get("/services/groups/bindings", handler.GetServiceGroupBindings)
            infrastructureGroup.Post("/services/groups/bindings", handler.CreateServiceGroupBinding)
            infrastructureGroup.Get("/services/groups/bindings/:id", handler.GetServiceGroupBindingByID)
            infrastructureGroup.Put("/services/groups/bindings/:id", handler.UpdateServiceGroupBinding)
            infrastructureGroup.Delete("/services/groups/bindings/:id", handler.DeleteServiceGroupBinding)

            // -----------------------------------------------------------------
            //  Monitoring Entities (Contact groups, Notifications, Acknowledged)
            // -----------------------------------------------------------------
        // Group: /api/v1.0/monitoring/contactgroups -> Contact Group notification targets
        contactGroup := protected.Group("monitoring/contactgroups")
            contactGroup.Get("/", handler.GetContactGroups)
            contactGroup.Post("/", handler.CreateContactGroup)
            contactGroup.Get("/:id", handler.GetContactGroupByID)
            contactGroup.Put("/:id", handler.UpdateContactGroup)
            contactGroup.Delete("/:id", handler.DeleteContactGroup)

        // Group: /api/v1.0/monitoring/notifications -> Notification channel instances
        notificationGroup := protected.Group("monitoring/notifications")
            notificationGroup.Get("/", handler.GetNotifications)
            notificationGroup.Post("/", handler.CreateNotification)
            notificationGroup.Get("/:id", handler.GetNotificationByID)
            notificationGroup.Put("/:id", handler.UpdateNotification)
            notificationGroup.Delete("/:id", handler.DeleteNotification)

        // Group: /api/v1.0/monitoring/aknowledged -> Acknowledged incidents/events
        aknowledgedGroup := protected.Group("monitoring/aknowledged")
            aknowledgedGroup.Get("/", handler.GetAknowledged)
            aknowledgedGroup.Post("/", handler.CreateAknowledged)
            aknowledgedGroup.Get("/:id", handler.GetAknowledgedByID)
            aknowledgedGroup.Put("/:id", handler.UpdateAknowledged)
            aknowledgedGroup.Delete("/:id", handler.DeleteAknowledged)

            // -----------------------------------------------------------------
            //  Profile & Reports
            // -----------------------------------------------------------------
        // Group: /api/v1.0/profiles/settings -> Profile settings templates
        profileSettingGroup := protected.Group("profiles/settings")
            profileSettingGroup.Get("/", handler.GetProfileSettings)
            profileSettingGroup.Post("/", handler.CreateProfileSetting)
            profileSettingGroup.Get("/:id", handler.GetProfileSettingByID)
            profileSettingGroup.Put("/:id", handler.UpdateProfileSetting)
            profileSettingGroup.Delete("/:id", handler.DeleteProfileSetting)

        // Group: /api/v1.0/reports/manual -> Manually triggered reports
        reportManualGroup := protected.Group("reports/manual")
            reportManualGroup.Get("/", handler.GetReportManuals)
            reportManualGroup.Post("/", handler.CreateReportManual)
            reportManualGroup.Get("/:id", handler.GetReportManualByID)
            reportManualGroup.Put("/:id", handler.UpdateReportManual)
            reportManualGroup.Delete("/:id", handler.DeleteReportManual)

        // Group: /api/v1.0/reports/automatic -> Scheduled automated reports
        reportAutomaticGroup := protected.Group("reports/automatic")
            reportAutomaticGroup.Get("/", handler.GetReportAutomatics)
            reportAutomaticGroup.Post("/", handler.CreateReportAutomatic)
            reportAutomaticGroup.Get("/:id", handler.GetReportAutomaticByID)
            reportAutomaticGroup.Put("/:id", handler.UpdateReportAutomatic)
            reportAutomaticGroup.Delete("/:id", handler.DeleteReportAutomatic)

            // -----------------------------------------------------------------
            //  Account & Settings
            // -----------------------------------------------------------------
        // Group: /api/v1.0/account/setting/profiles/user-profile -> Authenticated user's profile detail
        accountProfile := protected.Group("account/setting/profiles/user-profile")
            accountProfile.Get("/", handler.GetOwnUserDetail)
            accountProfile.Post("/", handler.UpsertOwnUserDetail)

        // Group: /api/v1.0/system/settings -> Global key-value system configuration
        systemSettings := protected.Group("system/settings")
            systemSettings.Get("/", handler.GetSystemSettings)
            systemSettings.Post("/", handler.UpsertSystemSetting)
            systemSettings.Delete("/:key", handler.DeleteSystemSetting)

        // Group: /api/v1.0/account/setting/profiles/user-settings -> Per-user customizable settings
        userSettings := protected.Group("account/setting/profiles/user-settings")
            userSettings.Get("/", handler.ListUserSettings)
            userSettings.Post("/", handler.UpsertUserSetting)
            userSettings.Delete("/:key", handler.DeleteUserSetting)

            // -----------------------------------------------------------------
            //  Monitoring Checkers (HTTP Curl & ICMP)
            // -----------------------------------------------------------------
        // Group: /api/v1.0/monitoring/checker/http-curl -> HTTP endpoint synthetic checks
        httpCurlChecker := protected.Group("monitoring/checker/http-curl")
            httpCurlChecker.Get("/", handler.ListHTTPCurlChecks)
            httpCurlChecker.Post("/", handler.CreateHTTPCurlCheck)
            httpCurlChecker.Get("/:id", handler.GetHTTPCurlCheck)
            httpCurlChecker.Put("/:id", handler.UpdateHTTPCurlCheck)
            httpCurlChecker.Delete("/:id", handler.DeleteHTTPCurlCheck)

        // Group: /api/v1.0/monitoring/checker/icmp -> ICMP (ping) synthetic checks
        icmpChecker := protected.Group("monitoring/checker/icmp")
            icmpChecker.Get("/", handler.ListICMPChecks)
            icmpChecker.Post("/", handler.CreateICMPCheck)
            icmpChecker.Get("/:id", handler.GetICMPCheck)
            icmpChecker.Put("/:id", handler.UpdateICMPCheck)
            icmpChecker.Delete("/:id", handler.DeleteICMPCheck)

            // Aggregated host availability (ICMP + HTTP status history)
            protected.Get("/monitoring/hosts/availability/", handler.GetHostsAvailability)
            // Infrastructure alias (frontend expects /infrastructure/hosts/availability/)
            protected.Get("/infrastructure/hosts/availability/", handler.GetHostsAvailability)
        }

    // ---------------------------------------------------------------------
    //  Swagger / Docs (session protected inside handler) - out of auth scope
    // ---------------------------------------------------------------------
    docsGroup := app.Group("/docs/v1.0")
    docsGroup.Get("/login", swaggerHandler.LoginPage)
    docsGroup.Post("/login", swaggerHandler.Login)
    docsGroup.Get("/logout", swaggerHandler.Logout)
    docsGroup.Get("/*", swaggerHandler.Docs)
}