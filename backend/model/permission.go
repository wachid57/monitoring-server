package model

import (
	"time"
)

type Permission struct {
	ID          uint       `json:"id" gorm:"primaryKey"`
	Name        string     `json:"name" gorm:"not null;unique"`
	Description string     `json:"description"`
	Module      string     `json:"module" gorm:"not null"` // e.g., "users", "hosts", "reports"
	Action      string     `json:"action" gorm:"not null"` // e.g., "create", "read", "update", "delete"
	CreatedAt   time.Time  `json:"created_at"`
	UpdatedAt   time.Time  `json:"updated_at"`
	DeletedAt   *time.Time     `json:"deleted_at" gorm:"index"`
	
	// Many-to-many relationship with Role
	Roles       []Role     `json:"roles,omitempty" gorm:"many2many:role_permissions;"`
}

func (Permission) TableName() string {
	return "permissions"
}
