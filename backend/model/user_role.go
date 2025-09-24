package model

import (
    "time"
)

// UserRole represents explicit join table for users and roles with its own ID
type UserRole struct {
    ID        uint       `gorm:"primaryKey" json:"id"`
    UserID    uint       `json:"user_id"`
    RoleID    uint       `json:"role_id"`
    User      User       `json:"user,omitempty"`
    Role      Role       `json:"role,omitempty"`
    CreatedAt time.Time  `json:"created_at"`
    UpdatedAt time.Time  `json:"updated_at"`
    DeletedAt *time.Time `gorm:"index" json:"deleted_at,omitempty"`
}
