package model

import (

    "time"
)

type Role struct {
    ID        uint       `gorm:"primaryKey"`
    Name      string     `gorm:"uniqueIndex"`
    CreatedAt time.Time
    UpdatedAt time.Time
    DeletedAt *time.Time `gorm:"index"`
}