package migration

import (
    "gorm.io/gorm"
    "mini-npm-backend/model"
)

func CreateRolesTable(db *gorm.DB) error {
    return db.AutoMigrate(&model.Role{})
}