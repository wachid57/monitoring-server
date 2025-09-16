package handler

import (
    "github.com/gofiber/fiber/v2"
    "mini-npm-backend/model"
    "mini-npm-backend/database"
)

// GetRoleBindings godoc
// @Summary Get all role bindings
// @Tags RoleBindings
// @Produce json
// @Success 200 {array} model.RoleBinding
// @Router /api/v1.0/users/role-bindings [get]
func GetRoleBindings(c *fiber.Ctx) error {
    var bindings []model.RoleBinding
    if err := database.DB.Preload("User").Preload("Role").Preload("Group").Find(&bindings).Error; err != nil {
        return c.Status(500).JSON(fiber.Map{"error": "Failed to fetch role bindings"})
    }
    return c.JSON(bindings)
}

// CreateRoleBinding godoc
// @Summary Create a new role binding
// @Tags RoleBindings
// @Accept json
// @Produce json
// @Param binding body model.RoleBinding true "Role binding data"
// @Success 200 {object} model.RoleBinding
// @Failure 400 {object} map[string]string
// @Failure 500 {object} map[string]string
// @Router /api/v1.0/users/role-bindings [post]
func CreateRoleBinding(c *fiber.Ctx) error {
    var binding model.RoleBinding
    if err := c.BodyParser(&binding); err != nil {
        return c.Status(400).JSON(fiber.Map{"error": "Invalid request"})
    }
    if err := database.DB.Create(&binding).Error; err != nil {
        return c.Status(500).JSON(fiber.Map{"error": "Failed to create role binding"})
    }
    return c.JSON(binding)
}

// GetRoleBindingByID godoc
// @Summary Get role binding by ID
// @Tags RoleBindings
// @Produce json
// @Param id path int true "Role Binding ID"
// @Success 200 {object} model.RoleBinding
// @Failure 404 {object} map[string]string
// @Router /api/v1.0/users/role-bindings/{id} [get]
func GetRoleBindingByID(c *fiber.Ctx) error {
    var binding model.RoleBinding
    id := c.Params("id")
    if err := database.DB.Preload("User").Preload("Role").Preload("Group").First(&binding, id).Error; err != nil {
        return c.Status(404).JSON(fiber.Map{"error": "Role binding not found"})
    }
    return c.JSON(binding)
}

// UpdateRoleBinding godoc
// @Summary Update role binding by ID
// @Tags RoleBindings
// @Accept json
// @Produce json
// @Param id path int true "Role Binding ID"
// @Param binding body model.RoleBinding true "Role binding data"
// @Success 200 {object} model.RoleBinding
// @Failure 400 {object} map[string]string
// @Failure 404 {object} map[string]string
// @Failure 500 {object} map[string]string
// @Router /api/v1.0/users/role-bindings/{id} [put]
func UpdateRoleBinding(c *fiber.Ctx) error {
    var binding model.RoleBinding
    id := c.Params("id")
    if err := database.DB.First(&binding, id).Error; err != nil {
        return c.Status(404).JSON(fiber.Map{"error": "Role binding not found"})
    }
    if err := c.BodyParser(&binding); err != nil {
        return c.Status(400).JSON(fiber.Map{"error": "Invalid request"})
    }
    if err := database.DB.Save(&binding).Error; err != nil {
        return c.Status(500).JSON(fiber.Map{"error": "Failed to update role binding"})
    }
    return c.JSON(binding)
}

// DeleteRoleBinding godoc
// @Summary Delete role binding by ID
// @Tags RoleBindings
// @Param id path int true "Role Binding ID"
// @Success 204
// @Failure 500 {object} map[string]string
// @Router /api/v1.0/users/role-bindings/{id} [delete]
func DeleteRoleBinding(c *fiber.Ctx) error {
    id := c.Params("id")
    if err := database.DB.Delete(&model.RoleBinding{}, id).Error; err != nil {
        return c.Status(500).JSON(fiber.Map{"error": "Failed to delete role binding"})
    }
    return c.SendStatus(204)
}