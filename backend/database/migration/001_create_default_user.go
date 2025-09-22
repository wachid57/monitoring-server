package migration

import (
	"gorm.io/gorm"
	"golang.org/x/crypto/bcrypt"
	"monitoring-server/model"
)

func CreateDefaultUser(db *gorm.DB) error {
	// Create Administrator role first
	var adminRole model.Role
	adminRoleResult := db.Where("name = ?", "Administrator").First(&adminRole)
	if adminRoleResult.Error != nil {
		adminRole = model.Role{
			Name: "Administrator",
		}
		if err := db.Create(&adminRole).Error; err != nil {
			return err
		}
	}

	// Create User role
	var userRole model.Role
	userRoleResult := db.Where("name = ?", "User").First(&userRole)
	if userRoleResult.Error != nil {
		userRole = model.Role{
			Name: "User",
		}
		if err := db.Create(&userRole).Error; err != nil {
			return err
		}
	}

	// Create Moderator role
	var moderatorRole model.Role
	moderatorRoleResult := db.Where("name = ?", "Moderator").First(&moderatorRole)
	if moderatorRoleResult.Error != nil {
		moderatorRole = model.Role{
			Name: "Moderator",
		}
		if err := db.Create(&moderatorRole).Error; err != nil {
			return err
		}
	}

	// Create default user
	var count int64
	db.Model(&model.User{}).Where("username = ?", "wpm-admin").Count(&count)
	if count == 0 {
		// Use higher bcrypt cost for better security (same as auth.go)
		hash, err := bcrypt.GenerateFromPassword([]byte("masuk-wpm"), bcrypt.DefaultCost+2)
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

		// Assign Administrator role to the user (without group_id to avoid foreign key error)
		roleBinding := model.RoleBinding{
			UserID: user.ID,
			RoleID: adminRole.ID,
			// GroupID is optional, so we don't set it to avoid foreign key constraint
		}
		if err := db.Create(&roleBinding).Error; err != nil {
			return err
		}
	}
	
	return nil
}