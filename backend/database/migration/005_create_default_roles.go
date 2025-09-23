package migration

import (
	"gorm.io/gorm"
	"monitoring-server/model"
	"log"
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

	// Create Viewer role
	var viewerRoleCount int64
	db.Model(&model.Role{}).Where("name = ?", "Viewer").Count(&viewerRoleCount)
	if viewerRoleCount == 0 {
		viewerRole := model.Role{
			Name:        "Viewer",
			Description: "Read-only role",
		}
		if err := db.Create(&viewerRole).Error; err != nil {
			return err
		}
	}

	// Assign read-only permissions to Viewer
	// Find the Viewer role we just created (or existing)
	var viewer model.Role
	if err := db.Where("name = ?", "Viewer").First(&viewer).Error; err != nil {
		log.Println("Viewer role not found to assign permissions")
	} else {
		// Find read permissions
		var readPermissions []model.Permission
		if err := db.Where("action = ?", "read").Find(&readPermissions).Error; err == nil {
			for _, perm := range readPermissions {
				var rp model.RolePermission
				if err := db.Where("role_id = ? AND permission_id = ?", viewer.ID, perm.ID).First(&rp).Error; err != nil {
					// create if missing
					rp = model.RolePermission{RoleID: viewer.ID, PermissionID: perm.ID}
					if err := db.Create(&rp).Error; err != nil {
						log.Printf("failed to assign permission %s to Viewer: %v", perm.Name, err)
						return err
					}
				}
			}
		}
	}

	return nil
}
