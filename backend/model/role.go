package model

import (
    "time"
)

type Role struct {
    ID        uint       `gorm:"primaryKey" json:"id"`
    Name      string     `gorm:"uniqueIndex" json:"name"`
    Description string   `json:"description"`
    Native    bool       `gorm:"default:false" json:"native"`
    CreatedAt time.Time  `json:"created_at"`
    UpdatedAt time.Time  `json:"updated_at"`
    DeletedAt *time.Time `gorm:"index" json:"deleted_at,omitempty"`
    
    // Many-to-many relationship with Permission
    Permissions []Permission `json:"permissions,omitempty" gorm:"many2many:role_permissions;"`
}