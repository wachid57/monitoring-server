package migration

import (
    "gorm.io/gorm"
    "monitoring-server/model"
)

func CreateContactGroupsTable(db *gorm.DB) error {
    return db.AutoMigrate(&model.ContactGroup{})
}
