package handler

import (
	"bytes"
	"context"
	"log"
	"os/exec"
	"time"

	"monitoring-server/model"
	"gorm.io/gorm"
)

// EnsureDefaultData checks if there are users; if none, runs /app/migrate all
// and falls back to migration.InitDefaultData on failure.
func EnsureDefaultData(db *gorm.DB) error {
	var count int64
	if err := db.Model(&model.User{}).Count(&count).Error; err != nil {
		log.Printf("failed to count users: %v", err)
		// cannot proceed with migrate; return nil so application continues
		return nil
	}

	if count == 0 {
		log.Println("No users found; running migrate all to initialize DB")
		ctx, cancel := context.WithTimeout(context.Background(), 60*time.Second)
		defer cancel()
		cmd := exec.CommandContext(ctx, "migrate", "all")
		var out bytes.Buffer
		cmd.Stdout = &out
		cmd.Stderr = &out
		if err := cmd.Run(); err != nil {
			log.Printf("migrate failed: %v\noutput: %s", err, out.String())
			// migration binary failed; log and continue without calling InitDefaultData
			return nil
		}
		log.Printf("migrate output: %s", out.String())
		return nil
	}

	// users exist or fallback path — nothing more to do here
	return nil
}
