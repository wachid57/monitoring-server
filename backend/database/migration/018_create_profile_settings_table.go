package migration

import (
    "monitoring-server/model"
    "gorm.io/gorm"
)

func CreateProfileSettingsTable(db *gorm.DB) error {
    return db.AutoMigrate(&model.ProfileSetting{})
}
