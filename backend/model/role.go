package model

import "gorm.io/gorm"

type Role struct {
    ID   uint   `gorm:"primaryKey"`
    Name string `gorm:"uniqueIndex"`
    gorm.Model
}