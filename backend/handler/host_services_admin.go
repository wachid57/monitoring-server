package handler

import (
	"math/rand"
	"time"
	"github.com/gofiber/fiber/v2"
	"monitoring-server/database"
	"monitoring-server/model"
)

// RebuildHostServices godoc
// @Summary Rebuild aggregated host services for a host
// @Description Reconstruct rows in host_services from underlying check tables (ICMP, HTTP) for a host
// @Tags HostServices
// @Param id path int true "Host ID"
// @Produce json
// @Success 200 {object} map[string]interface{}
// @Failure 404 {object} map[string]string
// @Security BearerAuth
// @Router /api/v1.0/infrastructure/hosts/{id}/services/rebuild [post]
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

// PingRefreshHostServices godoc
// @Summary Simulate latency & status refresh for host services
// @Description Demo-only endpoint: randomizes status + latency; records status change events
// @Tags HostServices
// @Param id path int true "Host ID"
// @Produce json
// @Success 200 {object} map[string]interface{}
// @Failure 404 {object} map[string]string
// @Security BearerAuth
// @Router /api/v1.0/infrastructure/hosts/{id}/services/ping-refresh [post]
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
