package database

import (
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
	"os"
	"mini-npm-backend/model"
	"github.com/joho/godotenv"
)

var DB *gorm.DB

func InitDB() error {
	// Try to load .env from several locations
	_ = godotenv.Load("backend/.env")
	_ = godotenv.Load("../.env")
	_ = godotenv.Load(".env")

	dbUser := os.Getenv("DB_USER")
	dbPass := os.Getenv("DB_PASS")
	dbHost := os.Getenv("DB_HOST")
	dbPort := os.Getenv("DB_PORT")
	if dbPort == "" {
		dbPort = "3306"
	}
	dbName := os.Getenv("DB_NAME")

	dsn := dbUser + ":" + dbPass + "@tcp(" + dbHost + ":" + dbPort + ")/" + dbName + "?parseTime=true"
	db, err := gorm.Open(mysql.Open(dsn), &gorm.Config{})
	if err != nil {
		return err
	}
	DB = db
	return db.AutoMigrate(&model.User{})
}
