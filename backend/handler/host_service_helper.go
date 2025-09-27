package handler

import (
	"fmt"
	"monitoring-server/database"
	"monitoring-server/model"
)

// upsertHostService creates or updates a HostService row for given type+serviceID
func upsertHostService(hostID uint, serviceType string, serviceID uint, name, summary string) error {
	if hostID == 0 || serviceID == 0 || serviceType == "" { return nil }
	var existing model.HostService
	if err := database.DB.Where("host_id=? AND service_type=? AND service_id=?", hostID, serviceType, serviceID).First(&existing).Error; err == nil {
		existing.Name = name
		existing.Summary = summary
		return database.DB.Save(&existing).Error
	}
	return database.DB.Create(&model.HostService{HostID: hostID, ServiceType: serviceType, ServiceID: serviceID, Name: name, Summary: summary, Status: "UNKNOWN"}).Error
}

func deleteHostService(hostID uint, serviceType string, serviceID uint) error {
	if hostID == 0 || serviceID == 0 { return nil }
	return database.DB.Where("host_id=? AND service_type=? AND service_id=?", hostID, serviceType, serviceID).Delete(&model.HostService{}).Error
}

// refreshHostServicesForHost is optional (not used yet) to rebuild from source tables
func refreshHostServicesForHost(hostID uint) error {
	if hostID == 0 { return nil }
	// Example simple rebuild for ICMP & HTTP only
	var icmp []model.ICMPCheck
	var httpc []model.HTTPCurlCheck
	database.DB.Where("host_id=?", hostID).Find(&icmp)
	database.DB.Where("host_id=?", hostID).Find(&httpc)
	for _, c := range icmp { upsertHostService(c.HostID, "icmp", c.ID, c.FriendlyName, fmt.Sprintf("%s / interval %ds", c.Hostname, c.IntervalSec)) }
	for _, h := range httpc { upsertHostService(h.HostID, "http", h.ID, h.FriendlyName, fmt.Sprintf("%s exp %d", h.URL, h.ExpectedStatus)) }
	return nil
}
