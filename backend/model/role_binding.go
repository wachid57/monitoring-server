package model

import (
    "time"
)

type RoleBinding struct {
    ID        uint       `gorm:"primaryKey" json:"id"`
    UserID    uint       `json:"user_id"`
    RoleID    uint       `json:"role_id"`
    GroupID   *uint      `json:"group_id,omitempty"` // Made nullable with pointer
    User      User       `json:"user,omitempty"`
    Role      Role       `json:"role,omitempty"`
    Group     *Group     `json:"group,omitempty"`    // Made nullable with pointer
    CreatedAt time.Time  `json:"created_at"`
    UpdatedAt time.Time  `json:"updated_at"`
    DeletedAt *time.Time `gorm:"index" json:"deleted_at,omitempty"`
}