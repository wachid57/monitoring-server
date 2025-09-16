package model

import "time"

type HostGroup struct {
    ID         uint       `gorm:"primaryKey"`
    GroupName  string
    Alias      string
    HostID     uint
    GroupsTags string
    Keterangan string
    CreatedAt  time.Time
    UpdatedAt  time.Time
    DeletedAt  *time.Time `gorm:"index"`
}