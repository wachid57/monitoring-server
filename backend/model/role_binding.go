package model

import (
    "time"
)

type RoleBinding struct {
    ID        uint       `gorm:"primaryKey"`
    UserID    uint
    RoleID    uint
    GroupID   uint
    User      User
    Role      Role
    Group     Group
    CreatedAt time.Time
    UpdatedAt time.Time
    DeletedAt *time.Time `gorm:"index"`
}