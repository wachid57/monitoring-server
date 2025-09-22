package migration

import (
	"gorm.io/gorm"
	"monitoring-server/model"
)

func CreateRolesTable(db *gorm.DB) error {
	// Create the roles table using AutoMigrate
	return db.AutoMigrate(&model.Role{})
}
