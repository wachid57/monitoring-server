package handler

import (
    "github.com/gofiber/fiber/v2"
    "monitoring-server/model"
    "monitoring-server/database"
    "monitoring-server/rbac"
    "golang.org/x/crypto/bcrypt"
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
        Native:   true,
    }

    if err := database.DB.Create(&user).Error; err != nil {
        return c.Status(500).JSON(fiber.Map{"error": "Failed to create user"})
    }

    // If a role name is provided, ensure role exists and assign to user
    if req.Role != "" {
        var role model.Role
        if err := database.DB.Where("name = ?", req.Role).First(&role).Error; err != nil {
            // create role if not exists
            role = model.Role{Name: req.Role}
            if err := database.DB.Create(&role).Error; err != nil {
                return c.Status(500).JSON(fiber.Map{"error": "Failed to create role"})
            }
        }
        // create role_binding record if missing
        rb := model.RoleBinding{UserID: user.ID, RoleID: role.ID}
        _ = database.DB.Where("user_id = ? AND role_id = ?", user.ID, role.ID).FirstOrCreate(&rb)
        // ensure many-to-many association
        if err := rbac.AssignRoleToUser(database.DB, user.ID, role.ID); err != nil {
            return c.Status(500).JSON(fiber.Map{"error": "Failed to assign role to user"})
        }
    }

    // return created user with roles preloaded
    if err := database.DB.Preload("Roles").First(&user, user.ID).Error; err != nil {
        return c.JSON(user)
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
    // Use a request struct to control updatable fields and role handling
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

    // Update simple fields
    if req.Username != "" {
        user.Username = req.Username
    }
    if req.Email != "" {
        user.Email = req.Email
    }
    if req.Name != "" {
        user.Name = req.Name
    }

    // Update password if provided
    if req.Password != "" {
        hash, err := bcrypt.GenerateFromPassword([]byte(req.Password), bcrypt.DefaultCost)
        if err != nil {
            return c.Status(500).JSON(fiber.Map{"error": "Failed to hash password"})
        }
        user.Password = string(hash)
    }

    // Save base user fields
    if err := database.DB.Save(&user).Error; err != nil {
        return c.Status(500).JSON(fiber.Map{"error": "Failed to update user"})
    }

    // Handle role update: if Role provided, ensure role exists and replace association
    if req.Role != "" {
        var role model.Role
        if err := database.DB.Where("name = ?", req.Role).First(&role).Error; err != nil {
            // create role if not exists
            role = model.Role{Name: req.Role}
            if err := database.DB.Create(&role).Error; err != nil {
                return c.Status(500).JSON(fiber.Map{"error": "Failed to create role"})
            }
        }
        // replace roles association with the single selected role
        if err := database.DB.Model(&user).Association("Roles").Replace(&role); err != nil {
            return c.Status(500).JSON(fiber.Map{"error": "Failed to assign role to user"})
        }
    }

    // Return updated user with preloaded relations
    if err := database.DB.Preload("Roles").Preload("Groups").First(&user, user.ID).Error; err != nil {
        return c.Status(500).JSON(fiber.Map{"error": "Failed to fetch updated user"})
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
    if err := database.DB.Delete(&model.User{}, id).Error; err != nil {
        return c.Status(500).JSON(fiber.Map{"error": "Failed to delete user"})
    }
    return c.SendStatus(204)
}