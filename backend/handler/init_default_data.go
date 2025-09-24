package handler

import (
	"bytes"
	"context"
	"log"
	"os/exec"
	"time"

	"monitoring-server/model"
	"gorm.io/gorm"
	"golang.org/x/crypto/bcrypt"
)

// InitDefaultData checks if there are users; if none, runs migrate all
// and logs failures. Exported so `main` can call it.
func InitDefaultData(db *gorm.DB) error {
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
			// fall through to ensureDefaults so we still have base data
		}
		log.Printf("migrate output: %s", out.String())
		// continue to ensure defaults in case migrations were partial
	}

	// Always ensure critical defaults exist (idempotent)
	if err := ensureDefaults(db); err != nil {
		log.Printf("ensureDefaults failed: %v", err)
	}
	return nil
}

// ensureDefaults creates minimal default data if missing:
// - Administrator role
// - default permissions (if none exist)
// - wpm-admin user with admin password if missing
// - bind wpm-admin to Administrator and assign all permissions to Administrator
func ensureDefaults(db *gorm.DB) error {
	// Ensure Administrator role exists
	var adminRole model.Role
	if err := db.Where("name = ?", "Administrator").First(&adminRole).Error; err != nil {
		adminRole = model.Role{Name: "Administrator", Description: "Full access", Native: true}
		if err := db.Create(&adminRole).Error; err != nil {
			return err
		}
	}

	// Ensure some permissions exist
	var permCount int64
	if err := db.Model(&model.Permission{}).Count(&permCount).Error; err != nil {
		return err
	}
	if permCount == 0 {
		defaults := []model.Permission{
			{Name: "users:read", Module: "users", Action: "read", Description: "Read users"},
			{Name: "users:create", Module: "users", Action: "create", Description: "Create users"},
			{Name: "users:update", Module: "users", Action: "update", Description: "Update users"},
			{Name: "users:delete", Module: "users", Action: "delete", Description: "Delete users"},
			{Name: "roles:read", Module: "roles", Action: "read", Description: "Read roles"},
			{Name: "roles:update", Module: "roles", Action: "update", Description: "Update roles"},
			{Name: "hosts:read", Module: "hosts", Action: "read", Description: "Read hosts"},
			{Name: "reports:read", Module: "reports", Action: "read", Description: "Read reports"},
		}
		for _, p := range defaults {
			var exists int64
			db.Model(&model.Permission{}).Where("name = ?", p.Name).Count(&exists)
			if exists == 0 {
				if err := db.Create(&p).Error; err != nil {
					log.Printf("failed creating default permission %s: %v", p.Name, err)
				}
			}
		}
	}

	// Ensure wpm-admin user exists
	var adminUser model.User
	if err := db.Where("username = ?", "wpm-admin").First(&adminUser).Error; err != nil {
		hash, err := bcrypt.GenerateFromPassword([]byte("masuk-wpm"), bcrypt.DefaultCost)
		if err != nil {
			return err
		}
		adminUser = model.User{Username: "wpm-admin", Password: string(hash), Email: "admin@monitoring-server.com", Name: "Administrator", Native: true}
		if err := db.Create(&adminUser).Error; err != nil {
			return err
		}
	}

	// Ensure role binding exists
	var rb model.RoleBinding
	if err := db.Where("user_id = ? AND role_id = ?", adminUser.ID, adminRole.ID).First(&rb).Error; err != nil {
		rb = model.RoleBinding{UserID: adminUser.ID, RoleID: adminRole.ID}
		_ = db.Create(&rb).Error
	}

	// Ensure Administrator has all permissions
	var perms []model.Permission
	if err := db.Find(&perms).Error; err == nil {
		for _, p := range perms {
			var rp model.RolePermission
			if err := db.Where("role_id = ? AND permission_id = ?", adminRole.ID, p.ID).First(&rp).Error; err != nil {
				rp = model.RolePermission{RoleID: adminRole.ID, PermissionID: p.ID}
				_ = db.Create(&rp).Error
			}
		}
	}
	return nil
}
