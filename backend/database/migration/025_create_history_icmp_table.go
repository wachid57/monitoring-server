package migration

import (
    "gorm.io/gorm"
    "monitoring-server/model"
)

// CreateHistoryICMPTable creates history_icmp table
func CreateHistoryICMPTable(db *gorm.DB) error {
    return db.AutoMigrate(&model.HistoryICMP{})
}
