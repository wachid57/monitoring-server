package model

import "gorm.io/gorm"

// UserSetting stores per-user customizable settings (key-value) with optional name and description.
// Composite unique constraint (user_id, key) enforced via unique index tag.
type UserSetting struct {
	gorm.Model
	UserID uint   `gorm:"not null;index:idx_user_key,unique" json:"user_id"`
	Key    string `gorm:"size:128;not null;index:idx_user_key,unique" json:"key"`
	Value  string `gorm:"type:text" json:"value"`
	Name   string `gorm:"size:256" json:"name"`
	Description string `gorm:"type:text" json:"description"`
	Enabled bool `gorm:"default:true" json:"enabled"`
	Native  bool `gorm:"default:false" json:"native"` // user-created settings native=false
}

func (UserSetting) TableName() string { return "user_settings" }
