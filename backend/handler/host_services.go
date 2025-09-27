package handler

import (
    "github.com/gofiber/fiber/v2"
    "monitoring-server/database"
    "monitoring-server/model"
)

// GetHostServices aggregates a host and its related monitoring checks (ICMP + HTTP Curl)
func GetHostServices(c *fiber.Ctx) error {
    id := c.Params("id")
    // Load host
    var host model.Host
    if err := database.DB.First(&host, id).Error; err != nil {
        return c.Status(404).JSON(fiber.Map{"error":"host not found"})
    }
    // Query ICMP & HTTP checks filtered by HostID
    var icmp []model.ICMPCheck
    var httpc []model.HTTPCurlCheck
    database.DB.Where("host_id = ?", host.ID).Find(&icmp)
    database.DB.Where("host_id = ?", host.ID).Find(&httpc)

    return c.JSON(fiber.Map{
        "host": host,
        "icmp_checks": icmp,
        "http_checks": httpc,
    })
}
