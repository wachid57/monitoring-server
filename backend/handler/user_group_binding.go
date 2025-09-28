package handler

import (
    "github.com/gofiber/fiber/v2"
    "monitoring-server/database"
    "monitoring-server/model"
    "gorm.io/gorm"
)

// GetUserGroupAssignments lists group assignments for users.
// Optional query params:
//   user_id  -> filter by a specific user
//   username -> resolve user by username if user_id not provided
// Response shape: array of { user_id, username, group_id, group_name }
func GetUserGroupAssignments(c *fiber.Ctx) error {
    userID := c.QueryInt("user_id", 0)
    username := c.Query("username")

    // Build base SQL referencing the auto-generated join table 'user_groups'
    sql := `SELECT u.id AS user_id, u.username, g.id AS group_id, g.name AS group_name
            FROM users u
            JOIN user_groups ug ON u.id = ug.user_id
            JOIN groups g ON g.id = ug.group_id`

    var args []interface{}
    conditions := ""
    if userID != 0 {
        conditions = " WHERE u.id = ?"
        args = append(args, userID)
    } else if username != "" {
        conditions = " WHERE u.username = ?"
        args = append(args, username)
    }

    rows, err := database.DB.Raw(sql+conditions+" ORDER BY u.id, g.name", args...).Rows()
    if err != nil {
        return c.Status(500).JSON(fiber.Map{"error": "Failed to query user group assignments", "detail": err.Error()})
    }
    defer rows.Close()

    var results []map[string]interface{}
    for rows.Next() {
        var userID uint
        var uname string
        var groupID uint
        var groupName string
        _ = rows.Scan(&userID, &uname, &groupID, &groupName)
        results = append(results, fiber.Map{
            "user_id":    userID,
            "username":   uname,
            "group_id":   groupID,
            "group_name": groupName,
        })
    }
    return c.JSON(results)
}

// AssignGroupsToUserAPI replaces the groups for a user with the provided list of group_ids or group names.
// Accepts JSON body: { "user_id": <uint>, "group_ids": [uint], "group_names": [string] }
// One of group_ids or group_names must be provided (group_ids preferred).
// This enforces REPLACE semantics similar to role assignment (clears then inserts).
func AssignGroupsToUserAPI(c *fiber.Ctx) error {
    var req struct {
        UserID     uint     `json:"user_id"`
        GroupIDs   []uint   `json:"group_ids"`
        GroupNames []string `json:"group_names"`
    }
    if err := c.BodyParser(&req); err != nil {
        return c.Status(400).JSON(fiber.Map{"error": "Invalid request"})
    }
    if req.UserID == 0 {
        return c.Status(400).JSON(fiber.Map{"error": "user_id is required"})
    }
    if len(req.GroupIDs) == 0 && len(req.GroupNames) == 0 {
        return c.Status(400).JSON(fiber.Map{"error": "group_ids or group_names is required"})
    }

    var user model.User
    if err := database.DB.First(&user, req.UserID).Error; err != nil {
        return c.Status(404).JSON(fiber.Map{"error": "User not found"})
    }

    // Resolve groups
    var groups []model.Group
    if len(req.GroupIDs) > 0 {
        if err := database.DB.Where("id IN ?", req.GroupIDs).Find(&groups).Error; err != nil {
            return c.Status(500).JSON(fiber.Map{"error": "Failed to query groups"})
        }
    } else {
        if err := database.DB.Where("name IN ?", req.GroupNames).Find(&groups).Error; err != nil {
            return c.Status(500).JSON(fiber.Map{"error": "Failed to query groups"})
        }
        // Auto-create missing group names (idempotent) if group_names provided
        if len(groups) != len(req.GroupNames) {
            existing := map[string]bool{}
            for _, g := range groups {
                existing[g.Name] = true
            }
            for _, name := range req.GroupNames {
                if !existing[name] {
                    g := model.Group{Name: name}
                    if err := database.DB.Create(&g).Error; err != nil {
                        return c.Status(500).JSON(fiber.Map{"error": "Failed to create group", "detail": err.Error()})
                    }
                    groups = append(groups, g)
                }
            }
        }
    }

    err := database.DB.Transaction(func(tx *gorm.DB) error {
        // Clear existing join entries
        if err := tx.Exec("DELETE FROM user_groups WHERE user_id = ?", req.UserID).Error; err != nil {
            return err
        }
        // Insert new
        for _, g := range groups {
            if err := tx.Exec(
                "INSERT INTO user_groups (user_id, group_id, created_at, updated_at) VALUES (?, ?, NOW(), NOW())",
                req.UserID, g.ID,
            ).Error; err != nil {
                return err
            }
        }
        return nil
    })
    if err != nil {
        return c.Status(500).JSON(fiber.Map{"error": "Failed to assign groups", "detail": err.Error()})
    }

    return c.JSON(fiber.Map{"status": "ok", "assigned_groups": len(groups)})
}
