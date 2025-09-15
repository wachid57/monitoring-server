package model

import "gorm.io/gorm"

type User struct {
	ID       uint   `gorm:"primaryKey"`
	Username string `gorm:"uniqueIndex"`
	Password string
	Roles    []Role       `gorm:"many2many:user_roles;"`
	Groups   []Group      `gorm:"many2many:user_groups;"`
	gorm.Model
}

