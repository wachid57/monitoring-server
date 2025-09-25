package migration

import "gorm.io/gorm"

// DropHostGroupsObsoleteColumns removes legacy columns no longer used by the model
// to satisfy the request to keep HostGroup minimal. It's safe-guarded by existence checks.
func DropHostGroupsObsoleteColumns(db *gorm.DB) error {
    if db.Migrator().HasTable("host_groups") {
        if db.Migrator().HasColumn("host_groups", "id_group") {
            if err := db.Exec("ALTER TABLE host_groups DROP COLUMN id_group").Error; err != nil {
                return err
            }
        }
        if db.Migrator().HasColumn("host_groups", "id_host") {
            if err := db.Exec("ALTER TABLE host_groups DROP COLUMN id_host").Error; err != nil {
                return err
            }
        }
    }
    return nil
}
