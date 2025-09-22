package migration

import (
    "gorm.io/gorm"
    "monitoring-server/model"
)

func CreateDiskMetricTable(db *gorm.DB) error {
    return db.AutoMigrate(&model.DiskMetric{})
}
