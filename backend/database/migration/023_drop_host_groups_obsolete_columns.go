//go:build ignore
// +build ignore

package migration

import "gorm.io/gorm"

// DropHostGroupsObsoleteColumns drops id_group and id_host from host_groups if present.
func DropHostGroupsObsoleteColumns(db *gorm.DB) error {
    if !db.Migrator().HasTable("host_groups") {
        return nil
    }
    if db.Migrator().HasColumn("host_groups", "id_group") {
        if err := db.Migrator().DropColumn("host_groups", "id_group"); err != nil {
            return err
        }
    }
    if db.Migrator().HasColumn("host_groups", "id_host") {
        if err := db.Migrator().DropColumn("host_groups", "id_host"); err != nil {
            return err
        }
    }
    return nil
}
