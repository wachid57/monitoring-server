package migration

import (
    "monitoring-server/model"
    "gorm.io/gorm"
)

func CreateReportManualTable(db *gorm.DB) error {
    return db.AutoMigrate(&model.ReportManual{})
}
