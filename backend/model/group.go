package model

import "gorm.io/gorm"

type Group struct {
    ID   uint   `gorm:"primaryKey"`
    Name string `gorm:"uniqueIndex"`
    gorm.Model
}