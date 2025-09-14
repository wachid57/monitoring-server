package main

import (
	"github.com/gofiber/fiber/v2"
	"io/ioutil"
	"os"
	"os/exec"
	"sync"
)

type Proxy struct {
	ID     int    `json:"id"`
	Domain string `json:"domain"`
	Target string `json:"target"`
}

func fileExists(path string) bool {
	_, err := os.Stat(path)
	return err == nil
}

var (
	proxyList = []Proxy{}
	proxyLock sync.Mutex
	proxyID   = 1
)

func GetProxies(c *fiber.Ctx) error {
	proxyLock.Lock()
	defer proxyLock.Unlock()
	return c.JSON(proxyList)
}

func AddProxy(c *fiber.Ctx) error {
	var req Proxy
	if err := c.BodyParser(&req); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "Invalid request"})
	}
	proxyLock.Lock()
	req.ID = proxyID
	proxyID++
	proxyList = append(proxyList, req)
	proxyLock.Unlock()
	// TODO: Update Nginx config & reload
	updateNginxConfig()
	reloadNginx()
	return c.JSON(req)
}

func DeleteProxy(c *fiber.Ctx) error {
	id, err := c.ParamsInt("id")
	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "Invalid ID"})
	}
	proxyLock.Lock()
	for i, p := range proxyList {
		if p.ID == id {
			proxyList = append(proxyList[:i], proxyList[i+1:]...)
			break
		}
	}
	proxyLock.Unlock()
	// TODO: Update Nginx config & reload
	updateNginxConfig()
	reloadNginx()
	return c.SendStatus(fiber.StatusNoContent)

}

func updateNginxConfig() {
	config := ""
	proxyLock.Lock()
	defer proxyLock.Unlock()
	for _, p := range proxyList {
		config += fmt.Sprintf(`server {
    listen 80;
    server_name %s;
    location / {
        proxy_pass http://%s;
    }
}
`, p.Domain, p.Target)
	}
	_ = ioutil.WriteFile("../nginx/conf.d/proxy.conf", []byte(config), 0644)
}

func reloadNginx() {
	// Jalankan perintah reload nginx di container
	cmd := exec.Command("docker", "exec", "mini-npm-nginx-1", "nginx", "-s", "reload")
	_ = cmd.Run()
}
