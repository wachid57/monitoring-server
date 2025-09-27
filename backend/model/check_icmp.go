package model

import "gorm.io/gorm"

// ICMPCheck defines configuration for an ICMP monitoring check
// (File renamed from icmp_check.go to check_icmp.go)
type ICMPCheck struct {
	gorm.Model
	HostID            uint   `json:"host_id" gorm:"index"`
	FriendlyName      string `json:"friendly_name" gorm:"size:255"`
	Hostname          string `json:"hostname" gorm:"size:255;index"`
	IntervalSec       int    `json:"interval_sec"`
	Retries           int    `json:"retries"`
	RetryIntervalSec  int    `json:"retry_interval_sec"`
	ResendDownCount   int    `json:"resend_down_count"`
	MonitorType       string `json:"monitor_type" gorm:"size:32"`
}

// TableName override for clearer plural form
func (ICMPCheck) TableName() string { return "icmp_checks" }
