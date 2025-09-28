package model

import "time"

// UserGroupBinding explicit join with metadata replacing plain many2many when needed.
// Note: We still keep User.Groups many2many for simple preload usage, but this table
// allows storing audit / metadata fields.
type UserGroupBinding struct {
    ID        uint       `gorm:"primaryKey" json:"id"`
    UserID    uint       `gorm:"index" json:"user_id"`
    GroupID   uint       `gorm:"index" json:"group_id"`
    // Metadata fields
    AssignedBy uint      `json:"assigned_by"`
    Note       string    `gorm:"size:255" json:"note"`
    // Soft domain flags / future extension
    Source     string    `gorm:"size:50" json:"source"` // e.g., "manual", "sync"
    CreatedAt  time.Time `json:"created_at"`
    UpdatedAt  time.Time `json:"updated_at"`
}
