package migration

import (
	"gorm.io/gorm"
	"monitoring-server/model"
)

// CreateServiceStatusEventsTable creates the service_status_events table used to store
// discrete service status events (state transitions or sampled states) for availability calculations.
// Fields:
//  - host_id (index)
//  - service_type (index)
//  - service_id (index)
//  - status (index)
//  - occurred_at (index)
// The combination of these allows efficient range queries per service and aggregation.
func CreateServiceStatusEventsTable(db *gorm.DB) error {
	return db.AutoMigrate(&model.ServiceStatusEvent{})
}

