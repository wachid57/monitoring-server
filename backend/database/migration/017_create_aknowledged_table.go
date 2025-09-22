package migration

import (
    "monitoring-server/model"
    "gorm.io/gorm"
)

func CreateAknowledgedTable(db *gorm.DB) error {
    return db.AutoMigrate(&model.Aknowledged{})
}
