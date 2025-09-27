package model

import "time"

// ServiceStatusEvent stores a status change (or sampled status) for a service
// Used for availability aggregation across a time range
type ServiceStatusEvent struct {
    ID          uint      `gorm:"primaryKey" json:"id"`
    HostID      uint      `gorm:"index" json:"host_id"`
    ServiceType string    `gorm:"size:32;index" json:"service_type"` // icmp|http|...
    ServiceID   uint      `gorm:"index" json:"service_id"`
    Status      string    `gorm:"size:16;index" json:"status"`      // OK|WARN|CRIT|UNKNOWN|H.DOWN
    OccurredAt  time.Time `gorm:"index" json:"occurred_at"`
}

func (ServiceStatusEvent) TableName() string { return "service_status_events" }