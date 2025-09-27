package model

import "gorm.io/gorm"

// UserDetail stores extended profile information for a user.
type UserDetail struct {
    gorm.Model
    UserID       uint   `gorm:"uniqueIndex" json:"user_id"`
    Introduction string `gorm:"type:text" json:"introduction"`
    Institution  string `json:"institution"`
    ContactEmail string `json:"contact_email"`
    Website      string `json:"website"`
    Location     string `json:"location"`
    Title        string `json:"title"`
}
