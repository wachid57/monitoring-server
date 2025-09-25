package handler

import (
    "github.com/gofiber/fiber/v2"
    "monitoring-server/model"
    "monitoring-server/database"
    "monitoring-server/rbac"
    "gorm.io/gorm"
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
    var role model.Role
    if err := database.DB.First(&role, id).Error; err != nil {
        return c.Status(404).JSON(fiber.Map{"error": "Role not found"})
    }
    if role.Native {
        return c.Status(403).JSON(fiber.Map{"error": "Cannot delete native role"})
    }
    if err := database.DB.Delete(&model.Role{}, id).Error; err != nil {
        return c.Status(500).JSON(fiber.Map{"error": "Failed to delete role"})
    }
    return c.SendStatus(204)
}

// GetUserRoleAssignments lists role assignments for a user or all assignments
// @Summary Get user-role assignments
// @Tags Roles
// @Produce json
// @Param user_id query int false "User ID"
// @Success 200 {array} map[string]interface{}
// @Security BearerAuth
// @Router /api/v1.0/users/roles/users [get]
func GetUserRoleAssignments(c *fiber.Ctx) error {
    userID := c.Query("user_id")
    var results []map[string]interface{}
    if userID != "" {
        // join users -> user_roles -> roles
        rows, err := database.DB.Raw(`SELECT u.id as user_id, u.username, r.id as role_id, r.name as role_name FROM users u JOIN user_roles ur ON u.id = ur.user_id JOIN roles r ON ur.role_id = r.id WHERE u.id = ?`, userID).Rows()
        if err != nil {
            return c.Status(500).JSON(fiber.Map{"error": "Failed to query assignments", "detail": err.Error()})
        }
        defer rows.Close()
        for rows.Next() {
            var userID uint
            var username string
            var roleID uint
            var roleName string
            _ = rows.Scan(&userID, &username, &roleID, &roleName)
            results = append(results, map[string]interface{}{"user_id": userID, "username": username, "role_id": roleID, "role_name": roleName})
        }
        return c.JSON(results)
    }

    // all assignments
    rows, err := database.DB.Raw(`SELECT u.id as user_id, u.username, r.id as role_id, r.name as role_name FROM users u JOIN user_roles ur ON u.id = ur.user_id JOIN roles r ON ur.role_id = r.id`).Rows()
    if err != nil {
        return c.Status(500).JSON(fiber.Map{"error": "Failed to query assignments", "detail": err.Error()})
    }
    defer rows.Close()
    for rows.Next() {
        var userID uint
        var username string
        var roleID uint
        var roleName string
        _ = rows.Scan(&userID, &username, &roleID, &roleName)
        results = append(results, map[string]interface{}{"user_id": userID, "username": username, "role_id": roleID, "role_name": roleName})
    }
    return c.JSON(results)
}

// AssignRoleToUserAPI assigns a role to a user by role_id or role name
// @Summary Assign role to user
// @Tags Roles
// @Accept json
// @Produce json
// @Param body body map[string]interface{} true "{user_id, role_id?, role_name?}"
// @Success 200 {object} map[string]string
// @Security BearerAuth
// @Router /api/v1.0/users/roles/users [post]
func AssignRoleToUserAPI(c *fiber.Ctx) error {
    var req struct {
        UserID  uint   `json:"user_id"`
        RoleID  uint   `json:"role_id"`
        RoleName string `json:"role_name"`
    }
    if err := c.BodyParser(&req); err != nil {
        return c.Status(400).JSON(fiber.Map{"error": "Invalid request"})
    }
    if req.UserID == 0 {
        return c.Status(400).JSON(fiber.Map{"error": "user_id is required"})
    }
    var role model.Role
    if req.RoleID != 0 {
        if err := database.DB.First(&role, req.RoleID).Error; err != nil {
            return c.Status(404).JSON(fiber.Map{"error": "Role not found"})
        }
    } else if req.RoleName != "" {
        if err := database.DB.Where("name = ?", req.RoleName).First(&role).Error; err != nil {
            // create role if missing
            role = model.Role{Name: req.RoleName}
            if err := database.DB.Create(&role).Error; err != nil {
                return c.Status(500).JSON(fiber.Map{"error": "Failed to create role"})
            }
        }
    } else {
        return c.Status(400).JSON(fiber.Map{"error": "role_id or role_name is required"})
    }

    // Replace any existing roles for this user with the specified one in a transaction
    err := database.DB.Transaction(func(tx *gorm.DB) error {
        // Remove existing assignments to enforce single-role policy
        if err := tx.Where("user_id = ?", req.UserID).Delete(&model.UserRole{}).Error; err != nil {
            return err
        }
        if err := tx.Where("user_id = ?", req.UserID).Delete(&model.RoleBinding{}).Error; err != nil {
            return err
        }

        // Insert role_binding if not exists (raw SQL, MySQL-compatible)
        if err := tx.Exec(
            "INSERT INTO role_bindings (user_id, role_id, created_at, updated_at) "+
                "SELECT ?, ?, NOW(), NOW() FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM role_bindings WHERE user_id = ? AND role_id = ?)",
            req.UserID, role.ID, req.UserID, role.ID,
        ).Error; err != nil {
            return err
        }

        // Insert user_roles mapping if not exists (raw SQL)
        if err := tx.Exec(
            "INSERT INTO user_roles (user_id, role_id, created_at, updated_at) "+
                "SELECT ?, ?, NOW(), NOW() FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM user_roles WHERE user_id = ? AND role_id = ?)",
            req.UserID, role.ID, req.UserID, role.ID,
        ).Error; err != nil {
            return err
        }
        return nil
    })
    if err != nil {
        return c.Status(500).JSON(fiber.Map{"error": "Failed to assign role to user", "detail": err.Error()})
    }

    return c.JSON(fiber.Map{"status": "ok"})
}