package model

import "time"

// HostGroupBinding binds a host to a logical host group with metadata.
// Fields follow requested names for API responses.
type HostGroupBinding struct {
    ID          uint       `gorm:"primaryKey" json:"id"`
    Name        string     `gorm:"column:name" json:"name"`
    Alias       string     `gorm:"column:alias" json:"alias"`
    GroupID     uint       `gorm:"column:groupid" json:"groupid"`
    HostID      uint       `gorm:"column:hostid" json:"hostid"`
    Tags        string     `gorm:"column:tags" json:"tags"`
    Description string     `gorm:"column:description" json:"description"`
    Enabled     bool       `gorm:"column:enabled;default:true" json:"enabled"`
    CreatedAt   time.Time  `json:"created"`
    UpdatedAt   time.Time  `json:"updated"`
    DeletedAt   *time.Time `gorm:"index" json:"deleted,omitempty"`
}
