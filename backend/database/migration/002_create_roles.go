package migration

import (
    "gorm.io/gorm"
    "monitoring-server/model"
)

func CreateRolesTable(db *gorm.DB) error {
    return db.AutoMigrate(&model.Role{})
}