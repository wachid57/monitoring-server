package migration

import (
    "gorm.io/gorm"
    "mini-npm-backend/model"
)

func CreateHostsTable(db *gorm.DB) error {
    return db.AutoMigrate(&model.Host{})
}