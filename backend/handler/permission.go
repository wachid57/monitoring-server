package handler

import (
	"strconv"
	"github.com/gofiber/fiber/v2"
	"monitoring-server/database"
	"monitoring-server/model"
)

func GetPermissions(c *fiber.Ctx) error {
	var perms []model.Permission
	if err := database.DB.Find(&perms).Error; err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": err.Error()})
	}
	return c.Status(fiber.StatusOK).JSON(perms)
}

func CreatePermission(c *fiber.Ctx) error {
	p := new(model.Permission)
	if err := c.BodyParser(p); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": err.Error()})
	}
	if err := database.DB.Create(p).Error; err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": err.Error()})
	}
	return c.Status(fiber.StatusCreated).JSON(p)
}

func GetPermission(c *fiber.Ctx) error {
	id, _ := strconv.Atoi(c.Params("id"))
	var p model.Permission
	if err := database.DB.First(&p, id).Error; err != nil {
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{"error": "permission not found"})
	}
	return c.Status(fiber.StatusOK).JSON(p)
}

func UpdatePermission(c *fiber.Ctx) error {
	id, _ := strconv.Atoi(c.Params("id"))
	var p model.Permission
	if err := database.DB.First(&p, id).Error; err != nil {
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{"error": "permission not found"})
	}
	if err := c.BodyParser(&p); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": err.Error()})
	}
	if err := database.DB.Save(&p).Error; err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": err.Error()})
	}
	return c.Status(fiber.StatusOK).JSON(p)
}

func DeletePermission(c *fiber.Ctx) error {
	id, _ := strconv.Atoi(c.Params("id"))
	if err := database.DB.Delete(&model.Permission{}, id).Error; err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": err.Error()})
	}
	return c.SendStatus(fiber.StatusNoContent)
}

func GetRolePermissions(c *fiber.Ctx) error {
	roleId, _ := strconv.Atoi(c.Params("id"))
	var role model.Role
	if err := database.DB.Preload("Permissions").First(&role, roleId).Error; err != nil {
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{"error": "role not found"})
	}
	return c.Status(fiber.StatusOK).JSON(role.Permissions)
}

func AssignPermissionToRole(c *fiber.Ctx) error {
	roleId, _ := strconv.Atoi(c.Params("roleId"))
	permId, _ := strconv.Atoi(c.Params("permissionId"))
	var role model.Role
	var perm model.Permission
	if err := database.DB.First(&role, roleId).Error; err != nil {
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{"error": "role not found"})
	}
	if err := database.DB.First(&perm, permId).Error; err != nil {
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{"error": "permission not found"})
	}
	if err := database.DB.Model(&role).Association("Permissions").Append(&perm); err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": err.Error()})
	}
	return c.Status(fiber.StatusCreated).JSON(fiber.Map{"message": "permission assigned"})
}

func RemovePermissionFromRole(c *fiber.Ctx) error {
	roleId, _ := strconv.Atoi(c.Params("roleId"))
	permId, _ := strconv.Atoi(c.Params("permissionId"))
	var role model.Role
	var perm model.Permission
	if err := database.DB.First(&role, roleId).Error; err != nil {
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{"error": "role not found"})
	}
	if err := database.DB.First(&perm, permId).Error; err != nil {
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{"error": "permission not found"})
	}
	if err := database.DB.Model(&role).Association("Permissions").Delete(&perm); err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": err.Error()})
	}
	return c.Status(fiber.StatusOK).JSON(fiber.Map{"message": "permission removed"})
}
