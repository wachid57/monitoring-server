package main

import (
    "fmt"
    "mini-npm-backend/database"
    "mini-npm-backend/database/migration"
    "os"
    "strconv"
)

var migrations = []struct {
    Number int
    Name   string
    Func   func(db *database.DBType) error
}{
    {1, "CreateDefaultUser", func(db *database.DBType) error { return migration.CreateDefaultUser(db) }},
    {2, "CreateRolesTable", func(db *database.DBType) error { return migration.CreateRolesTable(db) }},
    {3, "CreateGroupsTable", func(db *database.DBType) error { return migration.CreateGroupsTable(db) }},
    {4, "CreateRoleBindingsTable", func(db *database.DBType) error { return migration.CreateRoleBindingsTable(db) }},
    {5, "CreateHostsTable", func(db *database.DBType) error { return migration.CreateHostsTable(db) }},
    {6, "CreateHostGroupsTable", func(db *database.DBType) error { return migration.CreateHostGroupsTable(db) }},
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