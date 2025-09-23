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

	// Ensure Administrator role exists and bind to user
	var adminRole model.Role
	if err := db.Where("name = ?", "Administrator").First(&adminRole).Error; err != nil {
		// create admin role
		adminRole = model.Role{Name: "Administrator", Description: "Full access"}
		if err := db.Create(&adminRole).Error; err != nil {
			return err
		}
	}

	// Create role binding (role_bindings table)
	rb := model.RoleBinding{UserID: user.ID, RoleID: adminRole.ID}
	if err := db.Create(&rb).Error; err != nil {
		return err
	}

	// Also ensure many-to-many user_roles association
	if err := rbac.AssignRoleToUser(db, user.ID, adminRole.ID); err != nil {
		return err
	}

	return nil
}
