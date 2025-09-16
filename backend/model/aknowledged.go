package model

type Aknowledged struct {
    ID        uint   `gorm:"primaryKey"`
    Message   string
    User      string
    Status    string
}
