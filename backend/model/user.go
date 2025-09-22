package model

import (
	"time"
)

type User struct {
	ID        uint       `gorm:"primaryKey" json:"id"`
	Username  string     `gorm:"uniqueIndex" json:"username"`
	Email     string     `gorm:"uniqueIndex" json:"email"`
	Name      string     `json:"name"`
	Password  string     `json:"password,omitempty"`
	Native    bool       `gorm:"default:false" json:"native"`
	Roles     []Role     `gorm:"many2many:user_roles;" json:"roles"`
	Groups    []Group    `gorm:"many2many:user_groups;" json:"groups"`
	CreatedAt time.Time  `json:"created_at"`
	UpdatedAt time.Time  `json:"updated_at"`
	DeletedAt *time.Time `gorm:"index" json:"deleted_at"`
}

