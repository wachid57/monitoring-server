package seed

import (
    "log"
    "monitoring-server/database"
    "monitoring-server/model"
)

// seedDefaultsForUser inserts default settings for one user if missing.
func seedDefaultsForUser(userID uint) error {
    defaults := []model.UserSetting{
        {Key: "ui_theme", Name: "UI Theme", Value: "auto", Description: "Preferred theme (light|dark|auto)"},
        {Key: "language", Name: "Language", Value: "en", Description: "Preferred language code"},
        {Key: "time_format", Name: "Time Format", Value: "24h", Description: "Display time format (12h|24h)"},
        {Key: "date_format", Name: "Date Format", Value: "YYYY-MM-DD", Description: "Display date format"},
        {Key: "dashboard_layout", Name: "Dashboard Layout", Value: "default", Description: "Chosen dashboard layout variant"},
        {Key: "notify_email", Name: "Notify by Email", Value: "true", Description: "Receive alert e-mails"},
        {Key: "notify_webhook", Name: "Notify by Webhook", Value: "false", Description: "Enable personal webhook notifications"},
    }
    for _, def := range defaults {
        var existing model.UserSetting
        if err := database.DB.Where("user_id = ? AND `key` = ?", userID, def.Key).First(&existing).Error; err == nil {
            continue
        }
        toCreate := def
        toCreate.UserID = userID
        if err := database.DB.Create(&toCreate).Error; err != nil {
            log.Printf("seed user %d setting %s failed: %v", userID, def.Key, err)
            return err
        }
    }
    return nil
}

// UserSettings seeds defaults for all users (startup use).
func UserSettings() error {
    var users []model.User
    if err := database.DB.Find(&users).Error; err != nil {
        return err
    }
    if len(users) == 0 {
        return nil
    }
    for _, u := range users {
        if err := seedDefaultsForUser(u.ID); err != nil { return err }
    }
    return nil
}

// Exported helper for lazy init.
func SeedDefaultsForUser(userID uint) error { return seedDefaultsForUser(userID) }
