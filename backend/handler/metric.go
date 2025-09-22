package handler

import (
    "github.com/gofiber/fiber/v2"
    "monitoring-server/model"
    "monitoring-server/database"
)

// GetCPUMetrics godoc
// @Summary List CPU metrics
// @Tags Metrics
// @Produce json
// @Success 200 {array} model.CPUMetric
// @Security BearerAuth
// @Router /api/v1.0/metrics/cpu/ [get]
func GetCPUMetrics(c *fiber.Ctx) error {
    var metrics []model.CPUMetric
    if err := database.DB.Find(&metrics).Error; err != nil {
        return c.Status(500).JSON(fiber.Map{"error": err.Error()})
    }
    return c.JSON(metrics)
}

// CreateCPUMetric godoc
// @Summary Create CPU metric
// @Tags Metrics
// @Accept json
// @Produce json
// @Param data body model.CPUMetric true "CPU Metric"
// @Success 200 {object} model.CPUMetric
// @Security BearerAuth
// @Router /api/v1.0/metrics/cpu/ [post]
func CreateCPUMetric(c *fiber.Ctx) error {
    var metric model.CPUMetric
    if err := c.BodyParser(&metric); err != nil {
        return c.Status(400).JSON(fiber.Map{"error": err.Error()})
    }
    if err := database.DB.Create(&metric).Error; err != nil {
        return c.Status(500).JSON(fiber.Map{"error": err.Error()})
    }
    return c.JSON(metric)
}

// GetCPUMetricByID godoc
// @Summary Get CPU metric by ID
// @Tags Metrics
// @Produce json
// @Param id path int true "ID"
// @Success 200 {object} model.CPUMetric
// @Security BearerAuth
// @Router /api/v1.0/metrics/cpu/{id} [get]
func GetCPUMetricByID(c *fiber.Ctx) error {
    var metric model.CPUMetric
    id := c.Params("id")
    if err := database.DB.First(&metric, id).Error; err != nil {
        return c.Status(404).JSON(fiber.Map{"error": "Not found"})
    }
    return c.JSON(metric)
}

// UpdateCPUMetric godoc
// @Summary Update CPU metric
// @Tags Metrics
// @Accept json
// @Produce json
// @Param id path int true "ID"
// @Param data body model.CPUMetric true "CPU Metric"
// @Success 200 {object} model.CPUMetric
// @Security BearerAuth
// @Router /api/v1.0/metrics/cpu/{id} [put]
func UpdateCPUMetric(c *fiber.Ctx) error {
    var metric model.CPUMetric
    id := c.Params("id")
    if err := database.DB.First(&metric, id).Error; err != nil {
        return c.Status(404).JSON(fiber.Map{"error": "Not found"})
    }
    if err := c.BodyParser(&metric); err != nil {
        return c.Status(400).JSON(fiber.Map{"error": err.Error()})
    }
    if err := database.DB.Save(&metric).Error; err != nil {
        return c.Status(500).JSON(fiber.Map{"error": err.Error()})
    }
    return c.JSON(metric)
}

// DeleteCPUMetric godoc
// @Summary Delete CPU metric
// @Tags Metrics
// @Param id path int true "ID"
// @Success 204
// @Security BearerAuth
// @Router /api/v1.0/metrics/cpu/{id} [delete]
func DeleteCPUMetric(c *fiber.Ctx) error {
    id := c.Params("id")
    if err := database.DB.Delete(&model.CPUMetric{}, id).Error; err != nil {
        return c.Status(500).JSON(fiber.Map{"error": err.Error()})
    }
    return c.SendStatus(204)
}

// Memory
// GetMemoryMetrics godoc
// @Summary List Memory metrics
// @Tags Metrics
// @Produce json
// @Success 200 {array} model.MemoryMetric
// @Security BearerAuth
// @Router /api/v1.0/metrics/memory/ [get]
func GetMemoryMetrics(c *fiber.Ctx) error {
    var metrics []model.MemoryMetric
    if err := database.DB.Find(&metrics).Error; err != nil {
        return c.Status(500).JSON(fiber.Map{"error": err.Error()})
    }
    return c.JSON(metrics)
}

// CreateMemoryMetric godoc
// @Summary Create Memory metric
// @Tags Metrics
// @Accept json
// @Produce json
// @Param data body model.MemoryMetric true "Memory Metric"
// @Success 200 {object} model.MemoryMetric
// @Security BearerAuth
// @Router /api/v1.0/metrics/memory/ [post]
func CreateMemoryMetric(c *fiber.Ctx) error {
    var metric model.MemoryMetric
    if err := c.BodyParser(&metric); err != nil {
        return c.Status(400).JSON(fiber.Map{"error": err.Error()})
    }
    if err := database.DB.Create(&metric).Error; err != nil {
        return c.Status(500).JSON(fiber.Map{"error": err.Error()})
    }
    return c.JSON(metric)
}

// GetMemoryMetricByID godoc
// @Summary Get Memory metric by ID
// @Tags Metrics
// @Produce json
// @Param id path int true "ID"
// @Success 200 {object} model.MemoryMetric
// @Security BearerAuth
// @Router /api/v1.0/metrics/memory/{id} [get]
func GetMemoryMetricByID(c *fiber.Ctx) error {
    var metric model.MemoryMetric
    id := c.Params("id")
    if err := database.DB.First(&metric, id).Error; err != nil {
        return c.Status(404).JSON(fiber.Map{"error": "Not found"})
    }
    return c.JSON(metric)
}

// UpdateMemoryMetric godoc
// @Summary Update Memory metric
// @Tags Metrics
// @Accept json
// @Produce json
// @Param id path int true "ID"
// @Param data body model.MemoryMetric true "Memory Metric"
// @Success 200 {object} model.MemoryMetric
// @Security BearerAuth
// @Router /api/v1.0/metrics/memory/{id} [put]
func UpdateMemoryMetric(c *fiber.Ctx) error {
    var metric model.MemoryMetric
    id := c.Params("id")
    if err := database.DB.First(&metric, id).Error; err != nil {
        return c.Status(404).JSON(fiber.Map{"error": "Not found"})
    }
    if err := c.BodyParser(&metric); err != nil {
        return c.Status(400).JSON(fiber.Map{"error": err.Error()})
    }
    if err := database.DB.Save(&metric).Error; err != nil {
        return c.Status(500).JSON(fiber.Map{"error": err.Error()})
    }
    return c.JSON(metric)
}

// DeleteMemoryMetric godoc
// @Summary Delete Memory metric
// @Tags Metrics
// @Param id path int true "ID"
// @Success 204
// @Security BearerAuth
// @Router /api/v1.0/metrics/memory/{id} [delete]
func DeleteMemoryMetric(c *fiber.Ctx) error {
    id := c.Params("id")
    if err := database.DB.Delete(&model.MemoryMetric{}, id).Error; err != nil {
        return c.Status(500).JSON(fiber.Map{"error": err.Error()})
    }
    return c.SendStatus(204)
}

// Disk
// GetDiskMetrics godoc
// @Summary List Disk metrics
// @Tags Metrics
// @Produce json
// @Success 200 {array} model.DiskMetric
// @Security BearerAuth
// @Router /api/v1.0/metrics/disk/ [get]
func GetDiskMetrics(c *fiber.Ctx) error {
    var metrics []model.DiskMetric
    if err := database.DB.Find(&metrics).Error; err != nil {
        return c.Status(500).JSON(fiber.Map{"error": err.Error()})
    }
    return c.JSON(metrics)
}

// CreateDiskMetric godoc
// @Summary Create Disk metric
// @Tags Metrics
// @Accept json
// @Produce json
// @Param data body model.DiskMetric true "Disk Metric"
// @Success 200 {object} model.DiskMetric
// @Security BearerAuth
// @Router /api/v1.0/metrics/disk/ [post]
func CreateDiskMetric(c *fiber.Ctx) error {
    var metric model.DiskMetric
    if err := c.BodyParser(&metric); err != nil {
        return c.Status(400).JSON(fiber.Map{"error": err.Error()})
    }
    if err := database.DB.Create(&metric).Error; err != nil {
        return c.Status(500).JSON(fiber.Map{"error": err.Error()})
    }
    return c.JSON(metric)
}

// GetDiskMetricByID godoc
// @Summary Get Disk metric by ID
// @Tags Metrics
// @Produce json
// @Param id path int true "ID"
// @Success 200 {object} model.DiskMetric
// @Security BearerAuth
// @Router /api/v1.0/metrics/disk/{id} [get]
func GetDiskMetricByID(c *fiber.Ctx) error {
    var metric model.DiskMetric
    id := c.Params("id")
    if err := database.DB.First(&metric, id).Error; err != nil {
        return c.Status(404).JSON(fiber.Map{"error": "Not found"})
    }
    return c.JSON(metric)
}

// UpdateDiskMetric godoc
// @Summary Update Disk metric
// @Tags Metrics
// @Accept json
// @Produce json
// @Param id path int true "ID"
// @Param data body model.DiskMetric true "Disk Metric"
// @Success 200 {object} model.DiskMetric
// @Security BearerAuth
// @Router /api/v1.0/metrics/disk/{id} [put]
func UpdateDiskMetric(c *fiber.Ctx) error {
    var metric model.DiskMetric
    id := c.Params("id")
    if err := database.DB.First(&metric, id).Error; err != nil {
        return c.Status(404).JSON(fiber.Map{"error": "Not found"})
    }
    if err := c.BodyParser(&metric); err != nil {
        return c.Status(400).JSON(fiber.Map{"error": err.Error()})
    }
    if err := database.DB.Save(&metric).Error; err != nil {
        return c.Status(500).JSON(fiber.Map{"error": err.Error()})
    }
    return c.JSON(metric)
}

// DeleteDiskMetric godoc
// @Summary Delete Disk metric
// @Tags Metrics
// @Param id path int true "ID"
// @Success 204
// @Security BearerAuth
// @Router /api/v1.0/metrics/disk/{id} [delete]
func DeleteDiskMetric(c *fiber.Ctx) error {
    id := c.Params("id")
    if err := database.DB.Delete(&model.DiskMetric{}, id).Error; err != nil {
        return c.Status(500).JSON(fiber.Map{"error": err.Error()})
    }
    return c.SendStatus(204)
}
