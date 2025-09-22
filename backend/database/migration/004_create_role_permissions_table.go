package migration

import (
	"gorm.io/gorm"
	"monitoring-server/model"
)

func CreateRolePermissionsTable(db *gorm.DB) error {
	// Create the role_permissions table using AutoMigrate
	return db.AutoMigrate(&model.RolePermission{})
}
