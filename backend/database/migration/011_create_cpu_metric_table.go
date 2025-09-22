package migration

import (
    "monitoring-server/model"
    "gorm.io/gorm"
)

func CreateCPUMetricTable(db *gorm.DB) error {
    return db.AutoMigrate(&model.CPUMetric{})
}
