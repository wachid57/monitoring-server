package model

import (
    "time"

)

type Group struct {
	ID        uint       `gorm:"primaryKey" json:"id"`
	Name      string     `gorm:"uniqueIndex" json:"name"`
	CreatedAt time.Time  `json:"created_at"`
	UpdatedAt time.Time  `json:"updated_at"`
	DeletedAt *time.Time `gorm:"index" json:"deleted_at,omitempty"`
}