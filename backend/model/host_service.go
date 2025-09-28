package model

import "time"

// HostService provides a denormalized unified view of services attached to a host.
// It references the concrete service row via ServiceID + ServiceType but also stores
// name & summary and last status metrics for fast listing.
type HostService struct {
	ID            uint       `json:"id" gorm:"primaryKey"`
	CreatedAt     time.Time  `json:"created_at"`
	UpdatedAt     time.Time  `json:"updated_at"`
	DeletedAt     *time.Time `json:"deleted_at,omitempty" gorm:"index"`
	HostID        uint    `json:"host_id" gorm:"index"`
	ServiceType   string  `json:"service_type" gorm:"size:32;index"` // icmp|http|cpu|memory|disk|... 
	ServiceID     uint    `json:"service_id" gorm:"index"`
	Name          string  `json:"name" gorm:"size:255"`
	Summary       string  `json:"summary" gorm:"size:512"`
	Status        string  `json:"status" gorm:"size:16"` // OK|DOWN|UNKNOWN
	LastCheckAt   *uint64 `json:"last_check_at" gorm:""` // optional epoch seconds
	LastLatencyMs int     `json:"last_latency_ms"`
	UptimePct     float64 `json:"uptime_pct"`
}
