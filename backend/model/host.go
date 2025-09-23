package model

import "time"

type Host struct {
    ID         uint       `gorm:"primaryKey"`
    ID         uint       `gorm:"primaryKey" json:"id"`
    IP         string     `json:"ip"`
    Hostname   string     `json:"hostname"`
    Alias      string     `json:"alias"`
    Deskripsi  string     `json:"deskripsi"`
    Service    string     `json:"service"`
    HostsTags  string     `json:"hosts_tags"`
    Keterangan string     `json:"keterangan"`
    CreatedAt  time.Time  `json:"created_at"`
    UpdatedAt  time.Time  `json:"updated_at"`
    DeletedAt  *time.Time `gorm:"index" json:"deleted_at"`
}