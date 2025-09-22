package migration

import (
    "gorm.io/gorm"
    "monitoring-server/model"
)

func CreateServiceGroupsTable(db *gorm.DB) error {
    return db.AutoMigrate(&model.ServiceGroup{})
}
