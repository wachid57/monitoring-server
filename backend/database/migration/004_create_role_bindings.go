package migration

import (
    "gorm.io/gorm"
    "monitoring-server/model"
)

func CreateRoleBindingsTable(db *gorm.DB) error {
    return db.AutoMigrate(&model.RoleBinding{})
}