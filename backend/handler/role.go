package handler

import (
    "github.com/gofiber/fiber/v2"
    "monitoring-server/model"
    "monitoring-server/database"
)

// GetRoles godoc
// @Summary Get all roles
// @Tags Roles
// @Produce json
// @Success 200 {array} model.Role
// @Security BearerAuth
// @Router /api/v1.0/users/roles [get]
func GetRoles(c *fiber.Ctx) error {
    var roles []model.Role
    // preload permissions so API returns role permissions too
    if err := database.DB.Preload("Permissions").Find(&roles).Error; err != nil {
        // return detailed error for debugging
        return c.Status(500).JSON(fiber.Map{"error": "Failed to fetch roles", "detail": err.Error()})
    }
    return c.JSON(roles)
}

// CreateRole godoc
// @Summary Create a new role
// @Tags Roles
// @Accept json
// @Produce json
// @Param role body model.Role true "Role data"
// @Success 200 {object} model.Role
// @Failure 400 {object} map[string]string
// @Failure 500 {object} map[string]string
// @Security BearerAuth
// @Router /api/v1.0/users/roles [post]
func CreateRole(c *fiber.Ctx) error {
    var role model.Role
    if err := c.BodyParser(&role); err != nil {
        return c.Status(400).JSON(fiber.Map{"error": "Invalid request"})
    }
    if err := database.DB.Create(&role).Error; err != nil {
        return c.Status(500).JSON(fiber.Map{"error": "Failed to create role"})
    }
    return c.JSON(role)
}

// GetRoleByID godoc
// @Summary Get role by ID
// @Tags Roles
// @Produce json
// @Param id path int true "Role ID"
// @Success 200 {object} model.Role
// @Failure 404 {object} map[string]string
// @Security BearerAuth
// @Router /api/v1.0/users/roles/{id} [get]
func GetRoleByID(c *fiber.Ctx) error {
    var role model.Role
    id := c.Params("id")
    if err := database.DB.First(&role, id).Error; err != nil {
        return c.Status(404).JSON(fiber.Map{"error": "Role not found"})
    }
    return c.JSON(role)
}

// UpdateRole godoc
// @Summary Update role by ID
// @Tags Roles
// @Accept json
// @Produce json
// @Param id path int true "Role ID"
// @Param role body model.Role true "Role data"
// @Success 200 {object} model.Role
// @Failure 400 {object} map[string]string
// @Failure 404 {object} map[string]string
// @Failure 500 {object} map[string]string
// @Security BearerAuth
// @Router /api/v1.0/users/roles/{id} [put]
func UpdateRole(c *fiber.Ctx) error {
    var role model.Role
    id := c.Params("id")
    if err := database.DB.First(&role, id).Error; err != nil {
        return c.Status(404).JSON(fiber.Map{"error": "Role not found"})
    }
    if err := c.BodyParser(&role); err != nil {
        return c.Status(400).JSON(fiber.Map{"error": "Invalid request"})
    }
    if err := database.DB.Save(&role).Error; err != nil {
        return c.Status(500).JSON(fiber.Map{"error": "Failed to update role"})
    }
    return c.JSON(role)
}

// DeleteRole godoc
// @Summary Delete role by ID
// @Tags Roles
// @Param id path int true "Role ID"
// @Success 204
// @Failure 500 {object} map[string]string
// @Security BearerAuth
// @Router /api/v1.0/users/roles/{id} [delete]
func DeleteRole(c *fiber.Ctx) error {
    id := c.Params("id")
    if err := database.DB.Delete(&model.Role{}, id).Error; err != nil {
        return c.Status(500).JSON(fiber.Map{"error": "Failed to delete role"})
    }
    return c.SendStatus(204)
}