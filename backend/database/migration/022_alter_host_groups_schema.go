package migration

import (
    "gorm.io/gorm"
)

// AlterHostGroupsSchema ensures host_groups has requested columns and names:
// - add column id_group (nullable)
// - rename group_name -> name if old column exists
// - rename host_id -> id_host if old column exists
// This uses MySQL-safe ALTER statements guarded by existence checks.
func AlterHostGroupsSchema(db *gorm.DB) error {
    // Add id_group if missing
    if db.Migrator().HasTable("host_groups") {
        if !db.Migrator().HasColumn("host_groups", "id_group") {
            if err := db.Exec("ALTER TABLE host_groups ADD COLUMN id_group BIGINT NULL").Error; err != nil {
                return err
            }
        }
        // Rename group_name -> name (if old exists and new doesn't)
        if db.Migrator().HasColumn("host_groups", "group_name") && !db.Migrator().HasColumn("host_groups", "name") {
            if err := db.Exec("ALTER TABLE host_groups CHANGE COLUMN group_name name VARCHAR(255)").Error; err != nil {
                return err
            }
        }
        // Rename host_id -> id_host (if old exists and new doesn't)
        if db.Migrator().HasColumn("host_groups", "host_id") && !db.Migrator().HasColumn("host_groups", "id_host") {
            if err := db.Exec("ALTER TABLE host_groups CHANGE COLUMN host_id id_host BIGINT").Error; err != nil {
                return err
            }
        }
        // Ensure alias column exists
        if !db.Migrator().HasColumn("host_groups", "alias") {
            if err := db.Exec("ALTER TABLE host_groups ADD COLUMN alias VARCHAR(255)").Error; err != nil {
                return err
            }
        }
    }
    return nil
}
