package migration

import (
    "gorm.io/gorm"
    "monitoring-server/model"
)

// CreateServiceStatusEventsTable creates the service_status_events table used to
// store time-series status change events for services (icmp/http/etc). These
// events back availability aggregations.
func CreateServiceStatusEventsTable(db *gorm.DB) error {
    return db.AutoMigrate(&model.ServiceStatusEvent{})
}
