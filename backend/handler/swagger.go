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
    return c.Type("html").SendString(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Swagger Login</title>
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
        </head>
        <body class="bg-light">
            <div class="container d-flex justify-content-center align-items-center" style="height: 100vh;">
                <div class="card shadow" style="min-width:350px;">
                    <div class="card-body">
                        <h3 class="card-title text-center mb-4">Swagger Login</h3>
                        <form method="POST" action="/docs/v1.0/login">
                            <div class="mb-3">
                                <label for="username" class="form-label">Username</label>
                                <input name="username" type="text" class="form-control" id="username" required>
                            </div>
                            <div class="mb-3">
                                <label for="password" class="form-label">Password</label>
                                <input name="password" type="password" class="form-control" id="password" required>
                            </div>
                            <button type="submit" class="btn btn-primary w-100">Login</button>
                        </form>
                    </div>
                </div>
            </div>
            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>
        </body>
        </html>
    `)
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