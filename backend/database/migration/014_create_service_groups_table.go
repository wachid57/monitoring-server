package migration

import (
    "monitoring-server/model"
    "gorm.io/gorm"
)

func CreateServiceGroupsTable(db *gorm.DB) error {
    return db.AutoMigrate(&model.ServiceGroup{})
}
