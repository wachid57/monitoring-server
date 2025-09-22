package migration

import (
    "monitoring-server/model"
    "gorm.io/gorm"
)

func CreateHostsTable(db *gorm.DB) error {
    return db.AutoMigrate(&model.Host{})
}
