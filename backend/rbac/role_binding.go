package rbac

import (
    "monitoring-server/model"
    "gorm.io/gorm"
)

// AssignRoleToUser assigns a role to a user
func AssignRoleToUser(db *gorm.DB, userID, roleID uint) error {
    var user model.User
    if err := db.First(&user, userID).Error; err != nil {
        return err
    }
    return db.Model(&user).Association("Roles").Append(&model.Role{ID: roleID})
}

// AssignUserToGroup assigns a user to a group
func AssignUserToGroup(db *gorm.DB, userID, groupID uint) error {
    var user model.User
    if err := db.First(&user, userID).Error; err != nil {
        return err
    }
    return db.Model(&user).Association("Groups").Append(&model.Group{ID: groupID})
}

// BindRoleToGroup binds a role to a user in a group
func BindRoleToGroup(db *gorm.DB, userID, roleID, groupID uint) error {
    binding := model.RoleBinding{
        UserID:  userID,
        RoleID:  roleID,
    GroupID: &groupID,
    }
    return db.Create(&binding).Error
}

// CreateUserRole inserts into user_roles join table using the explicit model
func CreateUserRole(db *gorm.DB, userID, roleID uint) error {
    ur := model.UserRole{UserID: userID, RoleID: roleID}
    return db.Create(&ur).Error
}