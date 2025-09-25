package model

import "time"

// HostGroup represents grouping of hosts for infrastructure/monitoring views.
// JSON tags use snake_case to match the existing frontend. Some DB columns are
// explicitly named to align with the requested schema (e.g., name, id_host).
type HostGroup struct {
    ID         uint       `gorm:"primaryKey" json:"id"`
    // Store main name in DB column `group_name` (existing schema)
    GroupName  string     `gorm:"column:group_name" json:"group_name"`
    Alias      string     `gorm:"column:alias" json:"alias"`
    GroupsTags string     `json:"groups_tags"`
    Keterangan string     `json:"keterangan"`
    CreatedAt  time.Time  `json:"created_at"`
    UpdatedAt  time.Time  `json:"updated_at"`
    DeletedAt  *time.Time `gorm:"index" json:"deleted_at,omitempty"`
}