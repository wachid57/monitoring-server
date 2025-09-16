package model

type Notification struct {
    ID      uint   `gorm:"primaryKey"`
    Type    string
    Message string
    Status  string
}
