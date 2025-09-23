package migration

import (
	"log"
	"monitoring-server/model"
	"monitoring-server/rbac"
	"gorm.io/gorm"
	"golang.org/x/crypto/bcrypt"
)

// CreateDefaultUser seeds the default admin user if no users exist
func CreateDefaultUser(db *gorm.DB) error {
	var count int64
	db.Model(&model.User{}).Where("username = ?", "wpm-admin").Count(&count)
	if count > 0 {
		return nil
	}

	hash, err := bcrypt.GenerateFromPassword([]byte("masuk-wpm"), bcrypt.DefaultCost)
	if err != nil {
		return err
	}

	user := model.User{
		Username: "wpm-admin",
		Password: string(hash),
		Email:    "admin@monitoring-server.com",
		Name:     "Administrator",
		Native:   true,
	}
	if err := db.Create(&user).Error; err != nil {
		return err
	}

	log.Println("Created default user wpm-admin")
	// assign roles via separate migration
	return nil
}
