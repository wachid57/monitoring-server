package migration

import (
    "gorm.io/gorm"
    "monitoring-server/model"
)

func CreateReportManualTable(db *gorm.DB) error {
    return db.AutoMigrate(&model.ReportManual{})
}
