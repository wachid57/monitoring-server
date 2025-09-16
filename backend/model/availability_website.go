package model

type AvailabilityWebsite struct {
    ID      uint   `gorm:"primaryKey"`
    URL     string
    Status  string
    CheckedAt string
}
