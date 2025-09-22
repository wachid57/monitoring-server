package model

import (
	"time"
)

// RolePermission is a join table between roles and permissions
type RolePermission struct {
	ID           uint           `json:"id" gorm:"primaryKey"`
	RoleID       uint           `json:"role_id" gorm:"not null;index"`
	PermissionID uint           `json:"permission_id" gorm:"not null;index"`
	Role         Role           `json:"role,omitempty"`
	Permission   Permission     `json:"permission,omitempty"`
	CreatedAt    time.Time      `json:"created_at"`
	UpdatedAt    time.Time      `json:"updated_at"`
	DeletedAt    *time.Time     `json:"deleted_at" gorm:"index"`
}

func (RolePermission) TableName() string { return "role_permissions" }
