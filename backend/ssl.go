package main

import (
	"github.com/gofiber/fiber/v2"
	"os/exec"
	"sync"
)

type SSLInfo struct {
	Domain string `json:"domain"`
	CertPath string `json:"certPath"`
	KeyPath string `json:"keyPath"`
	Status string `json:"status"`
}

var (
	sslList = []SSLInfo{}
	sslLock sync.Mutex
)

func GenerateSSL(c *fiber.Ctx) error {
	type Req struct {
		Domain string `json:"domain"`
	}
	var req Req
	if err := c.BodyParser(&req); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "Invalid request"})
	}
	// Jalankan certbot (dummy, harus ada certbot di container)
	cmd := exec.Command("certbot", "certonly", "--standalone", "-d", req.Domain, "--non-interactive", "--agree-tos", "-m", "admin@"+req.Domain)
	err := cmd.Run()
	status := "success"
	if err != nil {
		status = "failed"
	}
	certPath := "/etc/letsencrypt/live/" + req.Domain + "/fullchain.pem"
	keyPath := "/etc/letsencrypt/live/" + req.Domain + "/privkey.pem"
	sslLock.Lock()
	sslList = append(sslList, SSLInfo{Domain: req.Domain, CertPath: certPath, KeyPath: keyPath, Status: status})
	sslLock.Unlock()
	return c.JSON(fiber.Map{"status": status, "certPath": certPath, "keyPath": keyPath})
}

func ListSSL(c *fiber.Ctx) error {
	sslLock.Lock()
	defer sslLock.Unlock()
	return c.JSON(sslList)
}
