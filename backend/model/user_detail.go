package model

import "time"

// UserDetail stores extended profile information for a user.
type UserDetail struct {
    ID           uint       `json:"id" gorm:"primaryKey"`
    CreatedAt    time.Time  `json:"created_at"`
    UpdatedAt    time.Time  `json:"updated_at"`
    DeletedAt    *time.Time `json:"deleted_at,omitempty" gorm:"index"`
    UserID       uint   `gorm:"uniqueIndex" json:"user_id"`
    Introduction string `gorm:"type:text" json:"introduction"`
    Institution  string `json:"institution"`
    ContactEmail string `json:"contact_email"`
    Website      string `json:"website"`
    Location     string `json:"location"`
    Title        string `json:"title"`
}
