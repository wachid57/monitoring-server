package migration

import (
    "gorm.io/gorm"
    "mini-npm-backend/model"
)

func CreateRoleBindingsTable(db *gorm.DB) error {
    return db.AutoMigrate(&model.RoleBinding{})
}