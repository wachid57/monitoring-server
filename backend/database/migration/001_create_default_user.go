package migration

import (
	"gorm.io/gorm"
	"golang.org/x/crypto/bcrypt"
	"mini-npm-backend/model"
)

func CreateDefaultUser(db *gorm.DB) error {
	var count int64
	db.Model(&model.User{}).Where("username = ?", "wpm-admin").Count(&count)
	if count == 0 {
		hash, _ := bcrypt.GenerateFromPassword([]byte("masuk-wpm"), bcrypt.DefaultCost)
		return db.Create(&model.User{Username: "wpm-admin", Password: string(hash)}).Error
	}
	return nil
}
