package handler

import (
	"math/rand"
	"time"
	"github.com/gofiber/fiber/v2"
	"monitoring-server/database"
	"monitoring-server/model"
)

// RebuildHostServices rebuilds host_services rows for a given host id
func RebuildHostServices(c *fiber.Ctx) error {
	id := c.Params("id")
	var host model.Host
	if err := database.DB.First(&host, id).Error; err != nil {
		return c.Status(404).JSON(fiber.Map{"error":"host not found"})
	}
	if err := refreshHostServicesForHost(host.ID); err != nil {
		return c.Status(500).JSON(fiber.Map{"error": err.Error()})
	}
	var count int64
	database.DB.Model(&model.HostService{}).Where("host_id=?", host.ID).Count(&count)
	return c.JSON(fiber.Map{"host_id": host.ID, "services_rebuilt": count})
}

// PingRefreshHostServices simulates status/latency refresh for services of a host
func PingRefreshHostServices(c *fiber.Ctx) error {
	id := c.Params("id")
	var host model.Host
	if err := database.DB.First(&host, id).Error; err != nil {
		return c.Status(404).JSON(fiber.Map{"error":"host not found"})
	}
	var services []model.HostService
	database.DB.Where("host_id=?", host.ID).Find(&services)
	now := uint64(time.Now().Unix())

	for i := range services {
		lat := rand.Intn(180) + 20 // 20..199 ms
		// randomize status a bit for demo
		sts := "OK"
		r := rand.Float64()
		switch {
		case r > 0.98: sts = "CRIT"
		case r > 0.94: sts = "WARN"
		case r > 0.99: sts = "H.DOWN" // rare
		}
		prev := services[i].Status
		services[i].LastLatencyMs = lat
		services[i].Status = sts
		services[i].LastCheckAt = &now
		database.DB.Save(&services[i])
		if prev != sts { // record event
			database.DB.Create(&model.ServiceStatusEvent{HostID: services[i].HostID, ServiceType: services[i].ServiceType, ServiceID: services[i].ServiceID, Status: sts, OccurredAt: time.Now().UTC()})
		}
	}
	return c.JSON(fiber.Map{"host_id": host.ID, "services_updated": len(services)})
}
