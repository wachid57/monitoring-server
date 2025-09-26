package main

import (
    "fmt"
    "monitoring-server/database"
    "monitoring-server/database/migration"
    "os"
    "strconv"
    "gorm.io/gorm"
)

var migrations = []struct {
    Number int
    Name   string
    Func   func(db *gorm.DB) error
}{
    // Schema migrations - create tables
    {1, "CreateRolesTable", func(db *gorm.DB) error { return migration.CreateRolesTable(db) }},
    {2, "CreateRolePermissionsTable", func(db *gorm.DB) error { return migration.CreateRolePermissionsTable(db) }},
    {3, "CreateRoleBindingsTable", func(db *gorm.DB) error { return migration.CreateRoleBindingsTable(db) }},
    {4, "CreateGroupsTable", func(db *gorm.DB) error { return migration.CreateGroupsTable(db) }},
    {5, "CreateHostsTable", func(db *gorm.DB) error { return migration.CreateHostsTable(db) }},
    {6, "CreateHostGroupsTable", func(db *gorm.DB) error { return migration.CreateHostGroupsTable(db) }},
    {7, "CreateICMPTable", func(db *gorm.DB) error { return migration.CreateICMPTable(db) }},
    {8, "CreateCPUMetricTable", func(db *gorm.DB) error { return migration.CreateCPUMetricTable(db) }},
    {9, "CreateMemoryMetricTable", func(db *gorm.DB) error { return migration.CreateMemoryMetricTable(db) }},
    {10, "CreateDiskMetricTable", func(db *gorm.DB) error { return migration.CreateDiskMetricTable(db) }},
    {11, "CreateServiceGroupsTable", func(db *gorm.DB) error { return migration.CreateServiceGroupsTable(db) }},
    {12, "CreateContactGroupsTable", func(db *gorm.DB) error { return migration.CreateContactGroupsTable(db) }},
    {13, "CreateNotificationsTable", func(db *gorm.DB) error { return migration.CreateNotificationsTable(db) }},
    {14, "CreateAknowledgedTable", func(db *gorm.DB) error { return migration.CreateAknowledgedTable(db) }},
    {15, "CreateProfileSettingsTable", func(db *gorm.DB) error { return migration.CreateProfileSettingsTable(db) }},
    {16, "CreateReportManualTable", func(db *gorm.DB) error { return migration.CreateReportManualTable(db) }},
    {17, "CreateReportAutomaticTable", func(db *gorm.DB) error { return migration.CreateReportAutomaticTable(db) }},
    {18, "CreateAvailabilityWebsiteTable", func(db *gorm.DB) error { return migration.CreateAvailabilityWebsiteTable(db) }},
    {24, "CreateUserProfilesTables", func(db *gorm.DB) error { return migration.CreateUserProfilesTables(db) }},

    // Seed data (run after schema)
    {19, "CreateDefaultPermissions", func(db *gorm.DB) error { return migration.CreateDefaultPermissions(db) }},
    {20, "CreateDefaultRoles", func(db *gorm.DB) error { return migration.CreateDefaultRoles(db) }},
    {21, "CreateDefaultUser", func(db *gorm.DB) error { return migration.CreateDefaultUser(db) }},
    {22, "AssignAdminToWpmAdmin", func(db *gorm.DB) error { return migration.AssignAdminToWpmAdmin(db) }},
}

func main() {
    if err := database.InitDB(); err != nil {
        fmt.Println("Failed to connect DB:", err)
        os.Exit(1)
    }

    if len(os.Args) < 2 {
        fmt.Println("Usage: migrate [list|all|<number>]")
        return
    }

    cmd := os.Args[1]
    switch cmd {
    case "list":
        for _, m := range migrations {
            fmt.Printf("%d. %s\n", m.Number, m.Name)
        }
    case "all":
        for _, m := range migrations {
            fmt.Printf("Migrating: %s ... ", m.Name)
            if err := m.Func(database.DB); err != nil {
                fmt.Printf("FAILED: %v\n", err)
                os.Exit(1)
            }
            fmt.Println("OK")
        }
        fmt.Println("All migrations applied.")
    default:
        num, err := strconv.Atoi(cmd)
        if err != nil {
            fmt.Println("Invalid migration number.")
            os.Exit(1)
        }
        for _, m := range migrations {
            if m.Number == num {
                fmt.Printf("Migrating: %s ... ", m.Name)
                if err := m.Func(database.DB); err != nil {
                    fmt.Printf("FAILED: %v\n", err)
                    os.Exit(1)
                }
                fmt.Println("OK")
                return
            }
        }
        fmt.Println("Migration number not found.")
    }
}