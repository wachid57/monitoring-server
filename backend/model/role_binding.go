package model

import "gorm.io/gorm"

type RoleBinding struct {
    ID      uint   `gorm:"primaryKey"`
    UserID  uint
    RoleID  uint
    GroupID uint
    User    User
    Role    Role
    Group   Group
    gorm.Model
}