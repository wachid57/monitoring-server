package migration

import (
    "monitoring-server/model"
    "gorm.io/gorm"
)

func CreateICMPTable(db *gorm.DB) error {
    return db.AutoMigrate(&model.ICMPService{})
}
