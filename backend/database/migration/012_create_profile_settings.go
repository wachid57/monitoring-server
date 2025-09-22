package migration

import (
    "gorm.io/gorm"
    "monitoring-server/model"
)

func CreateProfileSettingsTable(db *gorm.DB) error {
    return db.AutoMigrate(&model.ProfileSetting{})
}
