package migration

import (
    "gorm.io/gorm"
    "monitoring-server/model"
)

func CreateGroupsTable(db *gorm.DB) error {
    return db.AutoMigrate(&model.Group{})
}