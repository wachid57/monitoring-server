package migration

import (
    "gorm.io/gorm"
    "monitoring-server/model"
)

func CreateCPUMetricTable(db *gorm.DB) error {
    return db.AutoMigrate(&model.CPUMetric{})
}

func CreateMemoryMetricTable(db *gorm.DB) error {
    return db.AutoMigrate(&model.MemoryMetric{})
}

func CreateDiskMetricTable(db *gorm.DB) error {
    return db.AutoMigrate(&model.DiskMetric{})
}
