package migration

import (
    "gorm.io/gorm"
    "mini-npm-backend/model"
)

func CreateServiceGroupsTable(db *gorm.DB) error {
    return db.AutoMigrate(&model.ServiceGroup{})
}
