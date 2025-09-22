package handler

import (
    "github.com/gofiber/fiber/v2"
    "monitoring-server/database"
    "monitoring-server/database/migration"
    "gorm.io/gorm"
)

// List of available migrations
var migrations = []struct {
    Number int
    Name   string
    Func   func(db *gorm.DB) error
}{
    {1, "CreateDefaultUser", func(db *gorm.DB) error { return migration.CreateDefaultUser(db) }},
    {2, "CreateRolesTable", func(db *gorm.DB) error { return migration.CreateRolesTable(db) }},
    {3, "CreateGroupsTable", func(db *gorm.DB) error { return migration.CreateGroupsTable(db) }},
    {4, "CreateRoleBindingsTable", func(db *gorm.DB) error { return migration.CreateRoleBindingsTable(db) }},
}

// GET /migrate/list
func MigrateList(c *fiber.Ctx) error {
    var list []fiber.Map
    for _, m := range migrations {
        list = append(list, fiber.Map{
            "number": m.Number,
            "name":   m.Name,
        })
    }
    return c.JSON(list)
}

// POST /migrate/all
func MigrateAll(c *fiber.Ctx) error {
    for _, m := range migrations {
        if err := m.Func(database.DB); err != nil {
            return c.Status(500).JSON(fiber.Map{"error": "Migration failed", "step": m.Name})
        }
    }
    return c.JSON(fiber.Map{"status": "All migrations applied"})
}

// POST /migrate/{number}
func MigrateByNumber(c *fiber.Ctx) error {
    num := c.Params("number")
    for _, m := range migrations {
        if num == string(rune(m.Number+'0')) {
            if err := m.Func(database.DB); err != nil {
                return c.Status(500).JSON(fiber.Map{"error": "Migration failed", "step": m.Name})
            }
            return c.JSON(fiber.Map{"status": "Migration applied", "step": m.Name})
        }
    }
    return c.Status(404).JSON(fiber.Map{"error": "Migration number not found"})
}