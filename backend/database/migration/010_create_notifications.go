package migration

import (
    "gorm.io/gorm"
    "monitoring-server/model"
)

func CreateNotificationsTable(db *gorm.DB) error {
    return db.AutoMigrate(&model.Notification{})
}
