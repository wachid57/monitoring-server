package migration

import (
    "gorm.io/gorm"
    "mini-npm-backend/model"
)

func CreateProfileSettingsTable(db *gorm.DB) error {
    return db.AutoMigrate(&model.ProfileSetting{})
}
