package model

import "time"

// SystemSetting represents a simple key-value configuration stored in the database.
// Keys should be unique. Values are stored as text (string) but can contain JSON if needed.
type SystemSetting struct {
    ID          uint       `json:"id" gorm:"primaryKey"`
    CreatedAt   time.Time  `json:"created_at"`
    UpdatedAt   time.Time  `json:"updated_at"`
    DeletedAt   *time.Time `json:"deleted_at,omitempty" gorm:"index"`
    Key         string `gorm:"uniqueIndex;size:128" json:"key"`
    Value       string `gorm:"type:text" json:"value"`
    Name        string `gorm:"size:256" json:"name"`
    Description string `gorm:"type:text" json:"description"`
    Native      bool   `gorm:"default:false" json:"native"`
    Enabled     bool   `gorm:"default:true" json:"enabled"`
}
