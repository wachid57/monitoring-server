package migration

import (
    "log"
    "monitoring-server/database"
    "monitoring-server/model"
)

func init() {
    // Auto-migrate alert_rules table
    if err := database.DB.AutoMigrate(&model.AlertRule{}); err != nil {
        log.Println("migration: failed to migrate alert_rules:", err)
    }
}
