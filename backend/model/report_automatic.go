package model

type ReportAutomatic struct {
    ID      uint   `gorm:"primaryKey"`
    Title   string
    Content string
    GeneratedAt string
}
