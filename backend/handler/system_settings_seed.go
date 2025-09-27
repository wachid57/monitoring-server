package handler

import (
	"log"
	"monitoring-server/database"
	"monitoring-server/model"
)

// SeedSystemSettings inserts a baseline set of monitoring system settings if they do not exist (idempotent).
func SeedSystemSettings() error {
	defaults := []model.SystemSetting{
		{Key: "site_name", Name: "Site Name", Value: "Monitoring Platform", Description: "Public site / application name", Enabled: true, Native: true},
		{Key: "ui_theme", Name: "UI Theme", Value: "light", Description: "Default UI theme (light|dark|auto)", Enabled: true, Native: true},
		{Key: "default_language", Name: "Default Language", Value: "en", Description: "Default language code (e.g., en, id)", Enabled: true, Native: true},
		{Key: "timezone", Name: "Timezone", Value: "UTC", Description: "Default timezone for reports", Enabled: true, Native: true},
		{Key: "smtp_server", Name: "SMTP Server", Value: "smtp.example.com:587", Description: "SMTP server host:port", Enabled: true, Native: true},
		{Key: "smtp_username", Name: "SMTP Username", Value: "", Description: "SMTP auth username", Enabled: true, Native: true},
		{Key: "smtp_from", Name: "SMTP From Address", Value: "monitoring@example.com", Description: "From email address for outbound mail", Enabled: true, Native: true},
		{Key: "alert_email_enabled", Name: "Alert Email Enabled", Value: "true", Description: "Enable sending alert emails", Enabled: true, Native: true},
		{Key: "alert_email_subject_prefix", Name: "Alert Email Subject Prefix", Value: "[ALERT]", Description: "Subject prefix for alert emails", Enabled: true, Native: true},
		{Key: "alert_min_severity", Name: "Alert Minimum Severity", Value: "warning", Description: "Minimum severity that triggers notifications (info|warning|critical)", Enabled: true, Native: true},
		{Key: "retention_metrics_days", Name: "Retention Metrics (Days)", Value: "30", Description: "Retention in days for metrics time-series", Enabled: true, Native: true},
		{Key: "retention_events_days", Name: "Retention Events (Days)", Value: "90", Description: "Retention in days for event / incident history", Enabled: true, Native: true},
		{Key: "ping_interval_seconds", Name: "Ping Interval (Seconds)", Value: "60", Description: "Default ICMP check interval seconds", Enabled: true, Native: true},
		{Key: "tcp_timeout_ms", Name: "TCP Timeout (ms)", Value: "3000", Description: "Default TCP dial timeout in ms", Enabled: true, Native: true},
		{Key: "http_timeout_ms", Name: "HTTP Timeout (ms)", Value: "5000", Description: "Default HTTP request timeout in ms", Enabled: true, Native: true},
		{Key: "maintenance_mode", Name: "Maintenance Mode", Value: "false", Description: "If true, UI may display maintenance banner", Enabled: true, Native: true},
		{Key: "max_concurrent_checks", Name: "Max Concurrent Checks", Value: "20", Description: "Limiter for concurrent active monitoring goroutines", Enabled: true, Native: true},
		{Key: "webhook_enabled", Name: "Webhook Enabled", Value: "false", Description: "Enable outbound webhook notifications", Enabled: true, Native: true},
		{Key: "webhook_url", Name: "Webhook URL", Value: "", Description: "Webhook endpoint for outgoing JSON alerts", Enabled: true, Native: true},
		{Key: "auth_session_ttl_minutes", Name: "Auth Session TTL (Minutes)", Value: "120", Description: "Session TTL in minutes", Enabled: true, Native: true},
	}

	for _, def := range defaults {
		var existing model.SystemSetting
		if err := database.DB.Where("key = ?", def.Key).First(&existing).Error; err == nil {
			// don't overwrite existing value/name/description
			continue
		}
		if err := database.DB.Create(&def).Error; err != nil {
			log.Printf("seed setting %s failed: %v", def.Key, err)
			return err
		}
	}
	return nil
}
