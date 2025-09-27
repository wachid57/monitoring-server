package seed

import (
    "log"
    "monitoring-server/database"
    "monitoring-server/model"
)

func SystemSettings() error {
    defaults := []model.SystemSetting{
        {Key: "site_name", Name: "Site Name", Value: "Monitoring Platform", Description: "Public site / application name", Native: true, Enabled: true},
        {Key: "ui_theme", Name: "UI Theme", Value: "light", Description: "Default UI theme (light|dark|auto)", Native: true, Enabled: true},
        {Key: "default_language", Name: "Default Language", Value: "en", Description: "Default language code (e.g., en, id)", Native: true, Enabled: true},
        {Key: "timezone", Name: "Timezone", Value: "UTC", Description: "Default timezone for reports", Native: true, Enabled: true},
        {Key: "smtp_server", Name: "SMTP Server", Value: "smtp.example.com:587", Description: "SMTP server host:port", Native: true, Enabled: true},
        {Key: "smtp_username", Name: "SMTP Username", Value: "", Description: "SMTP auth username", Native: true, Enabled: true},
        {Key: "smtp_from", Name: "SMTP From Address", Value: "monitoring@example.com", Description: "From email address for outbound mail", Native: true, Enabled: true},
        {Key: "alert_email_enabled", Name: "Alert Email Enabled", Value: "true", Description: "Enable sending alert emails", Native: true, Enabled: true},
        {Key: "alert_email_subject_prefix", Name: "Alert Email Subject Prefix", Value: "[ALERT]", Description: "Subject prefix for alert emails", Native: true, Enabled: true},
        {Key: "alert_min_severity", Name: "Alert Minimum Severity", Value: "warning", Description: "Minimum severity that triggers notifications (info|warning|critical)", Native: true, Enabled: true},
        {Key: "retention_metrics_days", Name: "Retention Metrics (Days)", Value: "30", Description: "Retention in days for metrics time-series", Native: true, Enabled: true},
        {Key: "retention_events_days", Name: "Retention Events (Days)", Value: "90", Description: "Retention in days for event / incident history", Native: true, Enabled: true},
        {Key: "ping_interval_seconds", Name: "Ping Interval (Seconds)", Value: "60", Description: "Default ICMP check interval seconds", Native: true, Enabled: true},
        {Key: "tcp_timeout_ms", Name: "TCP Timeout (ms)", Value: "3000", Description: "Default TCP dial timeout in ms", Native: true, Enabled: true},
        {Key: "http_timeout_ms", Name: "HTTP Timeout (ms)", Value: "5000", Description: "Default HTTP request timeout in ms", Native: true, Enabled: true},
        {Key: "maintenance_mode", Name: "Maintenance Mode", Value: "false", Description: "If true, UI may display maintenance banner", Native: true, Enabled: true},
        {Key: "max_concurrent_checks", Name: "Max Concurrent Checks", Value: "20", Description: "Limiter for concurrent active monitoring goroutines", Native: true, Enabled: true},
        {Key: "webhook_enabled", Name: "Webhook Enabled", Value: "false", Description: "Enable outbound webhook notifications", Native: true, Enabled: true},
        {Key: "webhook_url", Name: "Webhook URL", Value: "", Description: "Webhook endpoint for outgoing JSON alerts", Native: true, Enabled: true},
        {Key: "auth_session_ttl_minutes", Name: "Auth Session TTL (Minutes)", Value: "120", Description: "Session TTL in minutes", Native: true, Enabled: true},
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
