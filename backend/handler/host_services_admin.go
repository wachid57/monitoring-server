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
		services[i].LastLatencyMs = lat
		services[i].Status = "OK"
		services[i].UptimePct = 100.0
		services[i].LastCheckAt = &now
		database.DB.Save(&services[i])
	}
	return c.JSON(fiber.Map{"host_id": host.ID, "services_updated": len(services)})
}
