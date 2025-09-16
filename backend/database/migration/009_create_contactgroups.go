package migration

import (
    "gorm.io/gorm"
    "mini-npm-backend/model"
)

func CreateContactGroupsTable(db *gorm.DB) error {
    return db.AutoMigrate(&model.ContactGroup{})
}
