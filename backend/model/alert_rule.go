package model

import "time"

// AlertRule defines threshold-based alerting per host + service type (optionally multiple service IDs later)
// Future extension: add service_id nullable, contact_group_id, severity, etc.
type AlertRule struct {
    ID uint `gorm:"primaryKey" json:"id"`
    CreatedAt time.Time `json:"created_at"`
    UpdatedAt time.Time `json:"updated_at"`

    HostID uint `json:"host_id" index:"idx_alert_rule_host_service"`
    ServiceType string `json:"service_type" gorm:"size:32;index:idx_alert_rule_host_service"`

    ThresholdLatencyMs *float64 `json:"threshold_latency_ms"` // trigger if latency exceeds (OK samples)
    MaxConsecutiveFailures *int `json:"max_consecutive_failures"` // trigger if DOWN/CRIT >= this count

    CooldownSec int `json:"cooldown_sec"` // minimal seconds between repeated alerts for same condition
    Enabled bool `json:"enabled"`
}

func (AlertRule) TableName() string { return "alert_rules" }
