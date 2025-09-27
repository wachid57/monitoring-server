package handler

import (
    "log"
    "monitoring-server/database"
    "monitoring-server/model"
)

// EnsureUserDefaultSettings ensures native default settings exist for a user.
// Idempotent: only missing keys are inserted.
func EnsureUserDefaultSettings(userID uint) error {
    defaults := []model.UserSetting{
        {UserID: userID, Key: "ui_theme", Name: "UI Theme", Value: "light", Description: "Preferred UI theme", Enabled: true, Native: true},
        {UserID: userID, Key: "language", Name: "Language", Value: "en", Description: "Preferred language code", Enabled: true, Native: true},
        {UserID: userID, Key: "timezone", Name: "Timezone", Value: "UTC", Description: "Preferred timezone", Enabled: true, Native: true},
        {UserID: userID, Key: "notify_email", Name: "Notify by Email", Value: "true", Description: "Receive alert emails", Enabled: true, Native: true},
        {UserID: userID, Key: "notify_sound", Name: "Notification Sound", Value: "true", Description: "Play sound on critical alert", Enabled: true, Native: true},
    }
    for _, def := range defaults {
        var existing model.UserSetting
        if err := database.DB.Where("user_id = ? AND `key` = ?", userID, def.Key).First(&existing).Error; err == nil {
            continue
        }
        if err := database.DB.Create(&def).Error; err != nil {
            log.Printf("ensure user default setting %d/%s failed: %v", userID, def.Key, err)
            return err
        }
    }
    return nil
}
