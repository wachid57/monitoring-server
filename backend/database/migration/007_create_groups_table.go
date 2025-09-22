package migration

import (
    "monitoring-server/model"
    "gorm.io/gorm"
)

func CreateGroupsTable(db *gorm.DB) error {
    return db.AutoMigrate(&model.Group{})
}
