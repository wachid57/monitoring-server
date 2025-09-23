package migration

import (
	"monitoring-server/model"
	"gorm.io/gorm"
)

// AssignAdminToWpmAdmin assigns Administrator role to wpm-admin
func AssignAdminToWpmAdmin(db *gorm.DB) error {
	var user model.User
	if err := db.Where("username = ?", "wpm-admin").First(&user).Error; err != nil {
		return nil // nothing to do
	}

	var adminRole model.Role
	if err := db.Where("name = ?", "Administrator").First(&adminRole).Error; err != nil {
		return nil
	}

	// create role binding if missing
	var rb model.RoleBinding
	if err := db.Where("user_id = ? AND role_id = ?", user.ID, adminRole.ID).First(&rb).Error; err != nil {
		rb = model.RoleBinding{UserID: user.ID, RoleID: adminRole.ID}
		if err := db.Create(&rb).Error; err != nil {
			return err
		}
	}

	// ensure many-to-many user_roles exists via GORM association
	if err := db.Model(&user).Association("Roles").Append(&adminRole); err != nil {
		return err
	}

	return nil
}
