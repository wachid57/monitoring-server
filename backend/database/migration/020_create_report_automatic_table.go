package migration

import (
    "monitoring-server/model"
    "gorm.io/gorm"
)

func CreateReportAutomaticTable(db *gorm.DB) error {
    return db.AutoMigrate(&model.ReportAutomatic{})
}
