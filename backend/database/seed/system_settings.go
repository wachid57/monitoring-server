package seed

import (
    "log"
    "monitoring-server/database"
    "monitoring-server/model"
)

func SystemSettings() error {
    defaults := []model.SystemSetting{
        {Key: "site_name", Name: "Site Name", Value: "Monitoring Platform", Description: "Public site / application name"},
        {Key: "ui_theme", Name: "UI Theme", Value: "light", Description: "Default UI theme (light|dark|auto)"},
        {Key: "default_language", Name: "Default Language", Value: "en", Description: "Default language code (e.g., en, id)"},
        {Key: "timezone", Name: "Timezone", Value: "UTC", Description: "Default timezone for reports"},
        {Key: "smtp_server", Name: "SMTP Server", Value: "smtp.example.com:587", Description: "SMTP server host:port"},
        {Key: "smtp_username", Name: "SMTP Username", Value: "", Description: "SMTP auth username"},
        {Key: "smtp_from", Name: "SMTP From Address", Value: "monitoring@example.com", Description: "From email address for outbound mail"},
        {Key: "alert_email_enabled", Name: "Alert Email Enabled", Value: "true", Description: "Enable sending alert emails"},
        {Key: "alert_email_subject_prefix", Name: "Alert Email Subject Prefix", Value: "[ALERT]", Description: "Subject prefix for alert emails"},
        {Key: "alert_min_severity", Name: "Alert Minimum Severity", Value: "warning", Description: "Minimum severity that triggers notifications (info|warning|critical)"},
        {Key: "retention_metrics_days", Name: "Retention Metrics (Days)", Value: "30", Description: "Retention in days for metrics time-series"},
        {Key: "retention_events_days", Name: "Retention Events (Days)", Value: "90", Description: "Retention in days for event / incident history"},
        {Key: "ping_interval_seconds", Name: "Ping Interval (Seconds)", Value: "60", Description: "Default ICMP check interval seconds"},
        {Key: "tcp_timeout_ms", Name: "TCP Timeout (ms)", Value: "3000", Description: "Default TCP dial timeout in ms"},
        {Key: "http_timeout_ms", Name: "HTTP Timeout (ms)", Value: "5000", Description: "Default HTTP request timeout in ms"},
        {Key: "maintenance_mode", Name: "Maintenance Mode", Value: "false", Description: "If true, UI may display maintenance banner"},
        {Key: "max_concurrent_checks", Name: "Max Concurrent Checks", Value: "20", Description: "Limiter for concurrent active monitoring goroutines"},
        {Key: "webhook_enabled", Name: "Webhook Enabled", Value: "false", Description: "Enable outbound webhook notifications"},
        {Key: "webhook_url", Name: "Webhook URL", Value: "", Description: "Webhook endpoint for outgoing JSON alerts"},
        {Key: "auth_session_ttl_minutes", Name: "Auth Session TTL (Minutes)", Value: "120", Description: "Session TTL in minutes"},
    }

    for _, def := range defaults {
        var existing model.SystemSetting
        if err := database.DB.Where("key = ?", def.Key).First(&existing).Error; err == nil {
            continue
        }
        if err := database.DB.Create(&def).Error; err != nil {
            log.Printf("seed setting %s failed: %v", def.Key, err)
            return err
        }
    }
    return nil
}
