package handler

import (
    "github.com/gofiber/fiber/v2"
    "github.com/gofiber/swagger"
    "github.com/gofiber/fiber/v2/middleware/session"
    "mini-npm-backend/database"
    "mini-npm-backend/model"
    "golang.org/x/crypto/bcrypt"
)

// Handler group for Swagger login/session
type SwaggerHandler struct {
    Store *session.Store
}

func NewSwaggerHandler(store *session.Store) *SwaggerHandler {
    return &SwaggerHandler{Store: store}
}

func (h *SwaggerHandler) LoginPage(c *fiber.Ctx) error {
    return SwaggerLoginPage(c)
}

func (h *SwaggerHandler) Login(c *fiber.Ctx) error {
    username := c.FormValue("username")
    password := c.FormValue("password")
    var user model.User
    if err := database.DB.Where("username = ?", username).First(&user).Error; err != nil {
        return c.SendString("Invalid credentials. <a href=\"/docs/v1.0/login\">Back</a>")
    }
    if bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(password)) != nil {
        return c.SendString("Invalid credentials. <a href=\"/docs/v1.0/login\">Back</a>")
    }
    sess, err := h.Store.Get(c)
    if err != nil {
        return c.SendStatus(fiber.StatusInternalServerError)
    }
    sess.Set("swagger_logged_in", true)
    sess.Save()
    return c.Redirect("/docs/v1.0")
}

func (h *SwaggerHandler) Logout(c *fiber.Ctx) error {
    sess, err := h.Store.Get(c)
    if err == nil {
        sess.Destroy()
    }
    return c.Redirect("/docs/v1.0/login")
}

func (h *SwaggerHandler) Docs(c *fiber.Ctx) error {
    sess, err := h.Store.Get(c)
    if err != nil || sess.Get("swagger_logged_in") != true {
        return c.Redirect("/docs/v1.0/login")
    }
    return swagger.HandlerDefault(c)
}