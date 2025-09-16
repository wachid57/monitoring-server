package model

type ServiceGroup struct {
    ID   uint   `gorm:"primaryKey"`
    Name string `gorm:"uniqueIndex"`
    Desc string
}
