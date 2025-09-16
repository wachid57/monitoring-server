package model

type ProfileSetting struct {
    ID      uint   `gorm:"primaryKey"`
    UserID  uint
    Key     string
    Value   string
}
