package model

import "gorm.io/gorm"

// SystemSetting represents a simple key-value configuration stored in the database.
// Keys should be unique. Values are stored as text (string) but can contain JSON if needed.
type SystemSetting struct {
    gorm.Model
    Key         string `gorm:"uniqueIndex;size:128" json:"key"`
    Value       string `gorm:"type:text" json:"value"`
    Name        string `gorm:"size:256" json:"name"`
    Description string `gorm:"type:text" json:"description"`
    Enabled     bool   `gorm:"default:true" json:"enabled"`
    Native      bool   `gorm:"default:true" json:"native"` // native = seeded / built-in (not user removable)
}
