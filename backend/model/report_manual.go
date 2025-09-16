package model

type ReportManual struct {
    ID      uint   `gorm:"primaryKey"`
    Title   string
    Content string
    CreatedBy string
}
