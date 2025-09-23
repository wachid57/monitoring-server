package migration

import (
	"monitoring-server/model"
	"gorm.io/gorm"
)

// CreateRolePermissionsTable creates the role_permissions table
func CreateRolePermissionsTable(db *gorm.DB) error {
	return db.AutoMigrate(&model.RolePermission{})
}
