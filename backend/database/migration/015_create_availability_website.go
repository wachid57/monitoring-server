package migration

import (
    "gorm.io/gorm"
    "mini-npm-backend/model"
)

func CreateAvailabilityWebsiteTable(db *gorm.DB) error {
    return db.AutoMigrate(&model.AvailabilityWebsite{})
}
