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
		// Use higher bcrypt cost for better security (same as auth.go)
		hash, err := bcrypt.GenerateFromPassword([]byte("masuk-wpm"), bcrypt.DefaultCost+2)
		if err != nil {
			return err
		}
		return db.Create(&model.User{
			Username: "wpm-admin", 
			Password: string(hash),
		}).Error
	}
	return nil
}
