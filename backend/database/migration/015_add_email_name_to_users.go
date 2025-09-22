package migration

import (
	"gorm.io/gorm"
)

func AddEmailAndNameToUsers(db *gorm.DB) error {
	// Add email column
	if err := db.Exec("ALTER TABLE users ADD COLUMN email VARCHAR(255) UNIQUE").Error; err != nil {
		// Ignore error if column already exists
	}
	
	// Add name column
	if err := db.Exec("ALTER TABLE users ADD COLUMN name VARCHAR(255)").Error; err != nil {
		// Ignore error if column already exists
	}
	
	return nil
}
