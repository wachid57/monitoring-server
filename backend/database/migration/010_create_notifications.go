package migration

import (
    "gorm.io/gorm"
    "mini-npm-backend/model"
)

func CreateNotificationsTable(db *gorm.DB) error {
    return db.AutoMigrate(&model.Notification{})
}
