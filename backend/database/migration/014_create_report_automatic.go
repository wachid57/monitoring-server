package migration

import (
    "gorm.io/gorm"
    "monitoring-server/model"
)

func CreateReportAutomaticTable(db *gorm.DB) error {
    return db.AutoMigrate(&model.ReportAutomatic{})
}
