package model

import "time"

// ServiceGroupBinding binds a service to a logical service group with metadata.
type ServiceGroupBinding struct {
    ID          uint       `gorm:"primaryKey" json:"id"`
    Name        string     `gorm:"column:name" json:"name"`
    Alias       string     `gorm:"column:alias" json:"alias"`
    GroupID     uint       `gorm:"column:groupid" json:"groupid"`
    ServiceID   uint       `gorm:"column:serviceid" json:"serviceid"`
    Tags        string     `gorm:"column:tags" json:"tags"`
    Description string     `gorm:"column:description" json:"description"`
    Enabled     bool       `gorm:"column:enabled;default:true" json:"enabled"`
    CreatedAt   time.Time  `json:"created"`
    UpdatedAt   time.Time  `json:"updated"`
    DeletedAt   *time.Time `gorm:"index" json:"deleted,omitempty"`
}
