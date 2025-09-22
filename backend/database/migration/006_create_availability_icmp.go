package migration

import (
    "gorm.io/gorm"
    "monitoring-server/model"
)

func CreateICMPTable(db *gorm.DB) error {
    return db.AutoMigrate(&model.ICMPService{})
}
