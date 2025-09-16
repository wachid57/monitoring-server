package migration

import (
    "gorm.io/gorm"
    "mini-npm-backend/model"
)

func CreateICMPTable(db *gorm.DB) error {
    return db.AutoMigrate(&model.ICMPService{})
}
