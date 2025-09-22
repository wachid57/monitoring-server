package migration

import (
	"log"
	"monitoring-server/model"

	"gorm.io/gorm"
)

func CreateDefaultPermissions(db *gorm.DB) error {
	log.Println("Creating permissions table and default permissions...")

	// Auto migrate the permission table
	if err := db.AutoMigrate(&model.Permission{}); err != nil {
		return err
	}

	// Auto migrate the role_permissions junction table
	if err := db.AutoMigrate(&model.RolePermission{}); err != nil {
		return err
	}

	// Define default permissions
	defaultPermissions := []model.Permission{
		// User Management
		{Name: "users.create", Description: "Create new users", Module: "users", Action: "create"},
		{Name: "users.read", Description: "View users", Module: "users", Action: "read"},
		{Name: "users.update", Description: "Update user information", Module: "users", Action: "update"},
		{Name: "users.delete", Description: "Delete users", Module: "users", Action: "delete"},
		
		// Role Management
		{Name: "roles.create", Description: "Create new roles", Module: "roles", Action: "create"},
		{Name: "roles.read", Description: "View roles", Module: "roles", Action: "read"},
		{Name: "roles.update", Description: "Update role information", Module: "roles", Action: "update"},
		{Name: "roles.delete", Description: "Delete roles", Module: "roles", Action: "delete"},
		
		// Host Management
		{Name: "hosts.create", Description: "Create new hosts", Module: "hosts", Action: "create"},
		{Name: "hosts.read", Description: "View hosts", Module: "hosts", Action: "read"},
		{Name: "hosts.update", Description: "Update host information", Module: "hosts", Action: "update"},
		{Name: "hosts.delete", Description: "Delete hosts", Module: "hosts", Action: "delete"},
		
		// Group Management
		{Name: "groups.create", Description: "Create new groups", Module: "groups", Action: "create"},
		{Name: "groups.read", Description: "View groups", Module: "groups", Action: "read"},
		{Name: "groups.update", Description: "Update group information", Module: "groups", Action: "update"},
		{Name: "groups.delete", Description: "Delete groups", Module: "groups", Action: "delete"},
		
		// Service Management
		{Name: "services.create", Description: "Create new services", Module: "services", Action: "create"},
		{Name: "services.read", Description: "View services", Module: "services", Action: "read"},
		{Name: "services.update", Description: "Update service information", Module: "services", Action: "update"},
		{Name: "services.delete", Description: "Delete services", Module: "services", Action: "delete"},
		
		// Reports
		{Name: "reports.create", Description: "Create reports", Module: "reports", Action: "create"},
		{Name: "reports.read", Description: "View reports", Module: "reports", Action: "read"},
		{Name: "reports.update", Description: "Update reports", Module: "reports", Action: "update"},
		{Name: "reports.delete", Description: "Delete reports", Module: "reports", Action: "delete"},
		
		// Dashboard
		{Name: "dashboard.read", Description: "View dashboard", Module: "dashboard", Action: "read"},
		
		// Notifications
		{Name: "notifications.create", Description: "Create notifications", Module: "notifications", Action: "create"},
		{Name: "notifications.read", Description: "View notifications", Module: "notifications", Action: "read"},
		{Name: "notifications.update", Description: "Update notifications", Module: "notifications", Action: "update"},
		{Name: "notifications.delete", Description: "Delete notifications", Module: "notifications", Action: "delete"},
		
		// System Administration
		{Name: "system.manage", Description: "System administration", Module: "system", Action: "manage"},
		{Name: "system.migrate", Description: "Run database migrations", Module: "system", Action: "migrate"},
	}

	// Create permissions if they don't exist
	for _, permission := range defaultPermissions {
		var existingPermission model.Permission
		if err := db.Where("name = ?", permission.Name).First(&existingPermission).Error; err != nil {
			if err == gorm.ErrRecordNotFound {
				if err := db.Create(&permission).Error; err != nil {
					log.Printf("Error creating permission %s: %v", permission.Name, err)
					return err
				}
				log.Printf("Created permission: %s", permission.Name)
			} else {
				return err
			}
		}
	}

	// Assign all permissions to Administrator role
	var adminRole model.Role
	if err := db.Where("name = ?", "Administrator").First(&adminRole).Error; err != nil {
		if err == gorm.ErrRecordNotFound {
			log.Println("Administrator role not found. Please run user migration first.")
			return nil
		}
		return err
	}

	// Get all permissions
	var allPermissions []model.Permission
	if err := db.Find(&allPermissions).Error; err != nil {
		return err
	}

	// Assign all permissions to administrator role
	for _, permission := range allPermissions {
		var existingRolePermission model.RolePermission
		if err := db.Where("role_id = ? AND permission_id = ?", adminRole.ID, permission.ID).First(&existingRolePermission).Error; err != nil {
			if err == gorm.ErrRecordNotFound {
				rolePermission := model.RolePermission{
					RoleID:       adminRole.ID,
					PermissionID: permission.ID,
				}
				if err := db.Create(&rolePermission).Error; err != nil {
					log.Printf("Error assigning permission %s to Administrator role: %v", permission.Name, err)
					return err
				}
				log.Printf("Assigned permission %s to Administrator role", permission.Name)
			}
		}
	}

	log.Println("Default permissions created and assigned successfully!")
	return nil
}
