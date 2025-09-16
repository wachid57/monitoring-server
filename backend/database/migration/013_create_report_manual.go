package migration

import (
    "gorm.io/gorm"
    "mini-npm-backend/model"
)

func CreateReportManualTable(db *gorm.DB) error {
    return db.AutoMigrate(&model.ReportManual{})
}
