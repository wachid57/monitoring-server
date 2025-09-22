package migration

import (
    "gorm.io/gorm"
    "monitoring-server/model"
)

func CreateHostsTable(db *gorm.DB) error {
    return db.AutoMigrate(&model.Host{})
}