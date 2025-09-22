package migration

import (
    "gorm.io/gorm"
    "monitoring-server/model"
)

func CreateHostGroupsTable(db *gorm.DB) error {
    return db.AutoMigrate(&model.HostGroup{})
}