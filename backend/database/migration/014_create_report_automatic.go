package migration

import (
    "gorm.io/gorm"
    "mini-npm-backend/model"
)

func CreateReportAutomaticTable(db *gorm.DB) error {
    return db.AutoMigrate(&model.ReportAutomatic{})
}
