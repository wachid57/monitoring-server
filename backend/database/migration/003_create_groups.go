package migration

import (
    "gorm.io/gorm"
    "mini-npm-backend/model"
)

func CreateGroupsTable(db *gorm.DB) error {
    return db.AutoMigrate(&model.Group{})
}