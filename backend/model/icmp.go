package model

type ICMPService struct {
    ID     uint   `gorm:"primaryKey"`
    Host   string
    Status string
}
