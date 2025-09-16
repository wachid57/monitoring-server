package handler

import (
    "github.com/gofiber/fiber/v2"
    "mini-npm-backend/model"
    "mini-npm-backend/database"
)

// GetReportManuals godoc
// @Summary List Manual Reports
// @Tags ReportManual
// @Produce json
// @Success 200 {array} model.ReportManual
// @Router /api/v1.0/reports/manual/ [get]
func GetReportManuals(c *fiber.Ctx) error {
    var reports []model.ReportManual
    if err := database.DB.Find(&reports).Error; err != nil {
        return c.Status(500).JSON(fiber.Map{"error": err.Error()})
    }
    return c.JSON(reports)
}

// CreateReportManual godoc
// @Summary Create Manual Report
// @Tags ReportManual
// @Accept json
// @Produce json
// @Param data body model.ReportManual true "Manual Report"
// @Success 200 {object} model.ReportManual
// @Router /api/v1.0/reports/manual/ [post]
func CreateReportManual(c *fiber.Ctx) error {
    var report model.ReportManual
    if err := c.BodyParser(&report); err != nil {
        return c.Status(400).JSON(fiber.Map{"error": err.Error()})
    }
    if err := database.DB.Create(&report).Error; err != nil {
        return c.Status(500).JSON(fiber.Map{"error": err.Error()})
    }
    return c.JSON(report)
}

// GetReportManualByID godoc
// @Summary Get Manual Report by ID
// @Tags ReportManual
// @Produce json
// @Param id path int true "ID"
// @Success 200 {object} model.ReportManual
// @Router /api/v1.0/reports/manual/{id} [get]
func GetReportManualByID(c *fiber.Ctx) error {
    var report model.ReportManual
    id := c.Params("id")
    if err := database.DB.First(&report, id).Error; err != nil {
        return c.Status(404).JSON(fiber.Map{"error": "Not found"})
    }
    return c.JSON(report)
}

// UpdateReportManual godoc
// @Summary Update Manual Report
// @Tags ReportManual
// @Accept json
// @Produce json
// @Param id path int true "ID"
// @Param data body model.ReportManual true "Manual Report"
// @Success 200 {object} model.ReportManual
// @Router /api/v1.0/reports/manual/{id} [put]
func UpdateReportManual(c *fiber.Ctx) error {
    var report model.ReportManual
    id := c.Params("id")
    if err := database.DB.First(&report, id).Error; err != nil {
        return c.Status(404).JSON(fiber.Map{"error": "Not found"})
    }
    if err := c.BodyParser(&report); err != nil {
        return c.Status(400).JSON(fiber.Map{"error": err.Error()})
    }
    if err := database.DB.Save(&report).Error; err != nil {
        return c.Status(500).JSON(fiber.Map{"error": err.Error()})
    }
    return c.JSON(report)
}

// DeleteReportManual godoc
// @Summary Delete Manual Report
// @Tags ReportManual
// @Param id path int true "ID"
// @Success 204
// @Router /api/v1.0/reports/manual/{id} [delete]
func DeleteReportManual(c *fiber.Ctx) error {
    id := c.Params("id")
    if err := database.DB.Delete(&model.ReportManual{}, id).Error; err != nil {
        return c.Status(500).JSON(fiber.Map{"error": err.Error()})
    }
    return c.SendStatus(204)
}
