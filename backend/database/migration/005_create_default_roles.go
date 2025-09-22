package migration

import (
	"gorm.io/gorm"
	"monitoring-server/model"
)

func CreateDefaultRoles(db *gorm.DB) error {
	// Create Administrator role
	var adminRoleCount int64
	db.Model(&model.Role{}).Where("name = ?", "Administrator").Count(&adminRoleCount)
	if adminRoleCount == 0 {
		adminRole := model.Role{
			Name: "Administrator",
		}
		if err := db.Create(&adminRole).Error; err != nil {
			return err
		}
	}

	// Create User role
	var userRoleCount int64
	db.Model(&model.Role{}).Where("name = ?", "User").Count(&userRoleCount)
	if userRoleCount == 0 {
		userRole := model.Role{
			Name: "User",
		}
		if err := db.Create(&userRole).Error; err != nil {
			return err
		}
	}

	// Create Moderator role
	var moderatorRoleCount int64
	db.Model(&model.Role{}).Where("name = ?", "Moderator").Count(&moderatorRoleCount)
	if moderatorRoleCount == 0 {
		moderatorRole := model.Role{
			Name: "Moderator",
		}
		if err := db.Create(&moderatorRole).Error; err != nil {
			return err
		}
	}

	return nil
}
