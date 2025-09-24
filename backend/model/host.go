package model

import "time"

type Host struct {
    ID         uint       `gorm:"primaryKey"`
    IP         string
    Hostname   string
    Alias      string
    Deskripsi  string
    Service    string
    HostsTags  string
    Keterangan string
    CreatedAt  time.Time
    UpdatedAt  time.Time
    DeletedAt  *time.Time `gorm:"index"`
}