package migration

import (
    "monitoring-server/model"
    "gorm.io/gorm"
)

func CreateContactGroupsTable(db *gorm.DB) error {
    return db.AutoMigrate(&model.ContactGroup{})
}
