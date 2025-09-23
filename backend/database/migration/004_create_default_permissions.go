package migration

import (
	"log"
	"monitoring-server/model"
	"gorm.io/gorm"
)

// CreateDefaultPermissions creates default permissions and ensures role_permissions table exists
func CreateDefaultPermissions(db *gorm.DB) error {
	log.Println("Creating permissions table and default permissions...")

	if err := db.AutoMigrate(&model.Permission{}); err != nil {
		return err
	}
	if err := db.AutoMigrate(&model.RolePermission{}); err != nil {
		return err
	}

	// Keep seeding minimal here; full seeding happens in other migration files.
	return nil
}
