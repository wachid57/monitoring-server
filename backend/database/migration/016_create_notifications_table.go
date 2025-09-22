package migration

import (
    "monitoring-server/model"
    "gorm.io/gorm"
)

func CreateNotificationsTable(db *gorm.DB) error {
    return db.AutoMigrate(&model.Notification{})
}
