package handler

import (
    "github.com/gofiber/fiber/v2"
    "monitoring-server/model"
    "monitoring-server/database"
)

// GetReportAutomatics godoc
// @Summary List Automatic Reports
// @Tags ReportAutomatic
// @Produce json
// @Success 200 {array} model.ReportAutomatic
// @Security BearerAuth
// @Router /api/v1.0/reports/automatic/ [get]
func GetReportAutomatics(c *fiber.Ctx) error {
    var reports []model.ReportAutomatic
    if err := database.DB.Find(&reports).Error; err != nil {
        return c.Status(500).JSON(fiber.Map{"error": err.Error()})
    }
    return c.JSON(reports)
}

// CreateReportAutomatic godoc
// @Summary Create Automatic Report
// @Tags ReportAutomatic
// @Accept json
// @Produce json
// @Param data body model.ReportAutomatic true "Automatic Report"
// @Success 200 {object} model.ReportAutomatic
// @Security BearerAuth
// @Router /api/v1.0/reports/automatic/ [post]
func CreateReportAutomatic(c *fiber.Ctx) error {
    var report model.ReportAutomatic
    if err := c.BodyParser(&report); err != nil {
        return c.Status(400).JSON(fiber.Map{"error": err.Error()})
    }
    if err := database.DB.Create(&report).Error; err != nil {
        return c.Status(500).JSON(fiber.Map{"error": err.Error()})
    }
    return c.JSON(report)
}

// GetReportAutomaticByID godoc
// @Summary Get Automatic Report by ID
// @Tags ReportAutomatic
// @Produce json
// @Param id path int true "ID"
// @Success 200 {object} model.ReportAutomatic
// @Security BearerAuth
// @Router /api/v1.0/reports/automatic/{id} [get]
func GetReportAutomaticByID(c *fiber.Ctx) error {
    var report model.ReportAutomatic
    id := c.Params("id")
    if err := database.DB.First(&report, id).Error; err != nil {
        return c.Status(404).JSON(fiber.Map{"error": "Not found"})
    }
    return c.JSON(report)
}

// UpdateReportAutomatic godoc
// @Summary Update Automatic Report
// @Tags ReportAutomatic
// @Accept json
// @Produce json
// @Param id path int true "ID"
// @Param data body model.ReportAutomatic true "Automatic Report"
// @Success 200 {object} model.ReportAutomatic
// @Security BearerAuth
// @Router /api/v1.0/reports/automatic/{id} [put]
func UpdateReportAutomatic(c *fiber.Ctx) error {
    var report model.ReportAutomatic
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

// DeleteReportAutomatic godoc
// @Summary Delete Automatic Report
// @Tags ReportAutomatic
// @Param id path int true "ID"
// @Success 204
// @Security BearerAuth
// @Router /api/v1.0/reports/automatic/{id} [delete]
func DeleteReportAutomatic(c *fiber.Ctx) error {
    id := c.Params("id")
    if err := database.DB.Delete(&model.ReportAutomatic{}, id).Error; err != nil {
        return c.Status(500).JSON(fiber.Map{"error": err.Error()})
    }
    return c.SendStatus(204)
}
