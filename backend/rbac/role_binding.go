package rbac

import (
    "monitoring-server/model"
    "gorm.io/gorm"
)

// AssignRoleToUser assigns a role to a user
func AssignRoleToUser(db *gorm.DB, userID, roleID uint) error {
    return db.Model(&model.User{}).Where("id = ?", userID).
        Association("Roles").Append(&model.Role{ID: roleID})
}

// AssignUserToGroup assigns a user to a group
func AssignUserToGroup(db *gorm.DB, userID, groupID uint) error {
    return db.Model(&model.User{}).Where("id = ?", userID).
        Association("Groups").Append(&model.Group{ID: groupID})
}

// BindRoleToGroup binds a role to a user in a group
func BindRoleToGroup(db *gorm.DB, userID, roleID, groupID uint) error {
    binding := model.RoleBinding{
        UserID:  userID,
        RoleID:  roleID,
        GroupID: groupID,
    }
    return db.Create(&binding).Error
}