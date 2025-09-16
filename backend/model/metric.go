package model

type CPUMetric struct {
    ID     uint   `gorm:"primaryKey"`
    Host   string
    Usage  float64
}

type MemoryMetric struct {
    ID     uint   `gorm:"primaryKey"`
    Host   string
    Usage  float64
}

type DiskMetric struct {
    ID     uint   `gorm:"primaryKey"`
    Host   string
    Usage  float64
}
