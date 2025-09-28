package model

import "time"

// HistoryICMP stores historical up/down records with optional description
// Represents a downtime (or uptime) window for an ICMP monitored host.
type HistoryICMP struct {
    ID          uint      `gorm:"primaryKey" json:"id"`
    HostID      uint      `gorm:"index" json:"host_id"`
    DownAt      time.Time `gorm:"index" json:"down_at"`   // when outage started
    UpAt        *time.Time `gorm:"index" json:"up_at"`    // when recovered (nullable if ongoing)
    Description string    `gorm:"size:255" json:"description"`
    CreatedAt   time.Time `json:"created_at"`
    UpdatedAt   time.Time `json:"updated_at"`
}

func (HistoryICMP) TableName() string { return "history_icmp" }
