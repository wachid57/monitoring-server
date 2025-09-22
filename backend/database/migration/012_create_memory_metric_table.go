package migration

import (
    "gorm.io/gorm"
    "monitoring-server/model"
)

func CreateMemoryMetricTable(db *gorm.DB) error {
    return db.AutoMigrate(&model.MemoryMetric{})
}
