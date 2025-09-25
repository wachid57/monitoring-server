package handler

import (
    "github.com/gofiber/fiber/v2"
    "monitoring-server/model"
    "monitoring-server/database"
    "golang.org/x/crypto/bcrypt"
    "log"
)

// GetUsers godoc
// @Summary Get all users
// @Tags Users
// @Produce json
// @Success 200 {array} model.User
// @Security BearerAuth
// @Router /api/v1.0/users [get]
func GetUsers(c *fiber.Ctx) error {
    var users []model.User
    if err := database.DB.Preload("Roles").Preload("Groups").Find(&users).Error; err != nil {
        return c.Status(500).JSON(fiber.Map{"error": "Failed to fetch users"})
    }

    // Fallback: if some users have no Roles preloaded (due to historical data),
    // build a role map from user_roles and merge in.
    var userIDs []uint
    for _, u := range users {
        userIDs = append(userIDs, u.ID)
    }
    if len(userIDs) > 0 {
        type row struct {
            UserID uint
            RoleID uint
            Name   string
            Description string
            Native bool
            CreatedAt string
            UpdatedAt string
        }
        var rows []row
        if err := database.DB.Raw(
            "SELECT ur.user_id AS user_id, r.id AS role_id, r.name, r.description, r.native, DATE_FORMAT(r.created_at, '%Y-%m-%d %H:%i:%s') as created_at, DATE_FORMAT(r.updated_at, '%Y-%m-%d %H:%i:%s') as updated_at "+
                "FROM user_roles ur JOIN roles r ON ur.role_id = r.id WHERE ur.user_id IN ?",
            userIDs,
        ).Scan(&rows).Error; err == nil && len(rows) > 0 {
            roleMap := map[uint][]model.Role{}
            for _, r := range rows {
                roleMap[r.UserID] = append(roleMap[r.UserID], model.Role{ID: r.RoleID, Name: r.Name, Description: r.Description, Native: r.Native})
            }
            for i := range users {
                if len(users[i].Roles) == 0 {
                    if rs, ok := roleMap[users[i].ID]; ok {
                        users[i].Roles = rs
                    }
                }
            }
        }
    }

    return c.JSON(users)
}

// CreateUser godoc
// @Summary Create a new user
// @Tags Users
// @Accept json
// @Produce json
// @Param user body model.User true "User data"
// @Success 200 {object} model.User
// @Failure 400 {object} map[string]string
// @Failure 500 {object} map[string]string
// @Security BearerAuth
// @Router /api/v1.0/users [post]
func CreateUser(c *fiber.Ctx) error {
    // Use a request struct to accept a role name from the client
    var req struct {
        Username string `json:"username"`
        Email    string `json:"email"`
        Name     string `json:"name"`
        Password string `json:"password"`
        Role     string `json:"role"`
    }
    if err := c.BodyParser(&req); err != nil {
        return c.Status(400).JSON(fiber.Map{"error": "Invalid request"})
    }

    // Hash password
    hash, err := bcrypt.GenerateFromPassword([]byte(req.Password), bcrypt.DefaultCost)
    if err != nil {
        return c.Status(500).JSON(fiber.Map{"error": "Failed to hash password"})
    }

    user := model.User{
        Username: req.Username,
        Email:    req.Email,
        Name:     req.Name,
        Password: string(hash),
        Native:   false,
    }

    if err := database.DB.Create(&user).Error; err != nil {
        return c.Status(500).JSON(fiber.Map{"error": "Failed to create user"})
    }

    // If a role name is provided, ensure role exists and assign to user (raw SQL to avoid RETURNING)
    if req.Role != "" {
        var role model.Role
        if err := database.DB.Where("name = ?", req.Role).First(&role).Error; err != nil {
            // create role if not exists
            role = model.Role{Name: req.Role}
            if err := database.DB.Create(&role).Error; err != nil {
                return c.Status(500).JSON(fiber.Map{"error": "Failed to create role"})
            }
        }
        // Insert into role_bindings if not exists
        if err := database.DB.Exec(
            "INSERT INTO role_bindings (user_id, role_id, created_at, updated_at) "+
                "SELECT ?, ?, NOW(), NOW() FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM role_bindings WHERE user_id = ? AND role_id = ?)",
            user.ID, role.ID, user.ID, role.ID,
        ).Error; err != nil {
            log.Printf("Failed to insert role_binding for user %d and role %d: %v", user.ID, role.ID, err)
        }
        // Insert into user_roles if not exists
        if err := database.DB.Exec(
            "INSERT INTO user_roles (user_id, role_id, created_at, updated_at) "+
                "SELECT ?, ?, NOW(), NOW() FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM user_roles WHERE user_id = ? AND role_id = ?)",
            user.ID, role.ID, user.ID, role.ID,
        ).Error; err != nil {
            log.Printf("Failed to insert user_roles for user %d and role %d: %v", user.ID, role.ID, err)
        }
    }

    // return created user with roles ensured
    if err := database.DB.Preload("Roles").First(&user, user.ID).Error; err != nil {
        // ignore error and continue to fallback aggregation
    }
    if len(user.Roles) == 0 {
        // Fallback: load roles via explicit join to ensure response includes role
        type rrow struct {
            RoleID uint
            Name   string
            Description string
            Native bool
        }
        var rrows []rrow
        if err := database.DB.Raw(
            "SELECT r.id AS role_id, r.name, r.description, r.native FROM user_roles ur JOIN roles r ON ur.role_id = r.id WHERE ur.user_id = ?",
            user.ID,
        ).Scan(&rrows).Error; err == nil {
            for _, rr := range rrows {
                user.Roles = append(user.Roles, model.Role{ID: rr.RoleID, Name: rr.Name, Description: rr.Description, Native: rr.Native})
            }
        }
    }
    return c.JSON(user)
}

// GetUserByID godoc
// @Summary Get user by ID
// @Tags Users
// @Produce json
// @Param id path int true "User ID"
// @Success 200 {object} model.User
// @Failure 404 {object} map[string]string
// @Security BearerAuth
// @Router /api/v1.0/users/{id} [get]
func GetUserByID(c *fiber.Ctx) error {
    var user model.User
    id := c.Params("id")
    if err := database.DB.Preload("Roles").Preload("Groups").First(&user, id).Error; err != nil {
        return c.Status(404).JSON(fiber.Map{"error": "User not found"})
    }
    return c.JSON(user)
}

// UpdateUser godoc
// @Summary Update user by ID
// @Tags Users
// @Accept json
// @Produce json
// @Param id path int true "User ID"
// @Param user body model.User true "User data"
// @Success 200 {object} model.User
// @Failure 400 {object} map[string]string
// @Failure 404 {object} map[string]string
// @Failure 500 {object} map[string]string
// @Security BearerAuth
// @Router /api/v1.0/users/{id} [put]
func UpdateUser(c *fiber.Ctx) error {
    var user model.User
    id := c.Params("id")
    if err := database.DB.First(&user, id).Error; err != nil {
        return c.Status(404).JSON(fiber.Map{"error": "User not found"})
    }
    if err := c.BodyParser(&user); err != nil {
        return c.Status(400).JSON(fiber.Map{"error": "Invalid request"})
    }
    if err := database.DB.Save(&user).Error; err != nil {
        return c.Status(500).JSON(fiber.Map{"error": "Failed to update user"})
    }
    return c.JSON(user)
}

// DeleteUser godoc
// @Summary Delete user by ID
// @Tags Users
// @Param id path int true "User ID"
// @Success 204
// @Failure 500 {object} map[string]string
// @Security BearerAuth
// @Router /api/v1.0/users/{id} [delete]
func DeleteUser(c *fiber.Ctx) error {
    id := c.Params("id")
    var user model.User
    if err := database.DB.First(&user, id).Error; err != nil {
        return c.Status(404).JSON(fiber.Map{"error": "User not found"})
    }
    // prevent deletion of native users
    if user.Native {
        return c.Status(403).JSON(fiber.Map{"error": "Cannot delete native user"})
    }
    if err := database.DB.Delete(&model.User{}, id).Error; err != nil {
        return c.Status(500).JSON(fiber.Map{"error": "Failed to delete user"})
    }
    return c.SendStatus(204)
}