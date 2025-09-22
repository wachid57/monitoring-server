package migration

import (
    "gorm.io/gorm"
    "monitoring-server/model"
)

func CreateAvailabilityWebsiteTable(db *gorm.DB) error {
    return db.AutoMigrate(&model.AvailabilityWebsite{})
}
