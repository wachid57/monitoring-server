package model

import (
	"time"
)

type User struct {
	ID        uint       `gorm:"primaryKey"`
	Username  string     `gorm:"uniqueIndex"`
	Email     string     `gorm:"uniqueIndex"`
	Name      string
	Password  string
	Roles     []Role     `gorm:"many2many:user_roles;"`
	Groups    []Group    `gorm:"many2many:user_groups;"`
	CreatedAt time.Time
	UpdatedAt time.Time
	DeletedAt *time.Time `gorm:"index"`
}

