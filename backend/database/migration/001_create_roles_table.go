package migration

import (
	"monitoring-server/model"
	"gorm.io/gorm"
)

// CreateRolesTable creates the roles table
func CreateRolesTable(db *gorm.DB) error {
	return db.AutoMigrate(&model.Role{})
}

// ...existing code...
