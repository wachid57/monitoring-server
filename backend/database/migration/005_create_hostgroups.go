package migration

import (
    "gorm.io/gorm"
    "mini-npm-backend/model"
)

func CreateHostGroupsTable(db *gorm.DB) error {
    return db.AutoMigrate(&model.HostGroup{})
}