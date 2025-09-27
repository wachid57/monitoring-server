package model

import "gorm.io/gorm"

// HTTPCurlCheck defines configuration for an HTTP(S) monitoring check using simple curl semantics
// Future: could include header overrides, method, expected status, etc.
type HTTPCurlCheck struct {
	gorm.Model
	HostID           uint   `json:"host_id" gorm:"index"`
	FriendlyName     string `json:"friendly_name" gorm:"size:255"`
	URL              string `json:"url" gorm:"size:512;index"`
	IntervalSec      int    `json:"interval_sec"`
	Retries          int    `json:"retries"`
	RetryIntervalSec int    `json:"retry_interval_sec"`
	ResendDownCount  int    `json:"resend_down_count"`
	MonitorType      string `json:"monitor_type" gorm:"size:32"`
	// Basic validation expectations
	ExpectedStatus   int    `json:"expected_status" gorm:"default:200"`
	Keyword          string `json:"keyword" gorm:"size:255"`
}

func (HTTPCurlCheck) TableName() string { return "http_curl_checks" }
