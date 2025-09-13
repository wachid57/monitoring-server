package database

import (
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
	"os"
	"mini-npm-backend/model"
)

var DB *gorm.DB

func InitDB() error {
	dsn := os.Getenv("DB_USER") + ":" + os.Getenv("DB_PASS") + "@tcp(" + os.Getenv("DB_HOST") + ":3306)/" + os.Getenv("DB_NAME") + "?parseTime=true"
	db, err := gorm.Open(mysql.Open(dsn), &gorm.Config{})
	if err != nil {
		return err
	}
	DB = db
	return db.AutoMigrate(&model.User{})
}
