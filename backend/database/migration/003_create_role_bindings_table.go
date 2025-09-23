package migration

import (
	"monitoring-server/model"
	"gorm.io/gorm"
)

// CreateRoleBindingsTable creates the role_bindings table
func CreateRoleBindingsTable(db *gorm.DB) error {
	return db.AutoMigrate(&model.RoleBinding{})
}
