package handler

import (
    "log"
    "github.com/gofiber/fiber/v2"
    "monitoring-server/database"
    "monitoring-server/model"
)

// GetHostServices aggregates a host and its related monitoring checks (ICMP + HTTP Curl) and unified host_services
func GetHostServices(c *fiber.Ctx) error {
    id := c.Params("id")
    var host model.Host
    if err := database.DB.First(&host, id).Error; err != nil {
        return c.Status(404).JSON(fiber.Map{"error": "host not found"})
    }

    var services []model.HostService
    database.DB.Where("host_id = ?", host.ID).Find(&services)

    if len(services) == 0 { // attempt lazy rebuild only if source checks exist
        var icmpCount int64
        var httpCount int64
        database.DB.Model(&model.ICMPCheck{}).Where("host_id=?", host.ID).Count(&icmpCount)
        database.DB.Model(&model.HTTPCurlCheck{}).Where("host_id=?", host.ID).Count(&httpCount)
        if icmpCount+httpCount > 0 {
            if err := refreshHostServicesForHost(host.ID); err != nil {
                log.Printf("lazy rebuild host_services failed host=%d err=%v", host.ID, err)
            } else {
                log.Printf("lazy rebuild host_services executed host=%d icmp=%d http=%d", host.ID, icmpCount, httpCount)
                database.DB.Where("host_id = ?", host.ID).Find(&services)
            }
        }
    }

    return c.JSON(fiber.Map{
        "host": host,
        "services": services,
    })
}
