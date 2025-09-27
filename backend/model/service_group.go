package model

// ServiceGroup represents a logical grouping for services.
// Added Alias, Tags, Description fields; kept Desc for backward compatibility with existing data.
// AutoMigrate will add new columns if they don't exist (no separate migration file needed).
type ServiceGroup struct {
    ID          uint   `gorm:"primaryKey" json:"id"`
    Name        string `gorm:"uniqueIndex" json:"name"`
    // Legacy short description field (existing column)
    Desc        string `json:"Desc,omitempty"`
    // New extended fields
    Alias       string `gorm:"column:alias" json:"alias"`
    Description string `gorm:"column:description" json:"description"`
    Tags        string `gorm:"column:tags" json:"tags"`
}
