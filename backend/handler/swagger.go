package handler

import (
    "github.com/gofiber/fiber/v2"
    "github.com/gofiber/swagger"
    "github.com/gofiber/fiber/v2/middleware/session"
    "monitoring-server/database"
    "monitoring-server/model"
    "golang.org/x/crypto/bcrypt"
    "github.com/golang-jwt/jwt/v4"
    "time"
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

    // Generate JWT token
    token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
        "username": user.Username,
        "exp":      jwt.NewNumericDate(time.Now().Add(time.Hour * 24)),
    })
    jwtSecret := []byte("your-secret-key") // Ganti dengan secret Anda
    tokenString, err := token.SignedString(jwtSecret)
    if err != nil {
        return c.SendStatus(fiber.StatusInternalServerError)
    }

    // Redirect ke Swagger UI dengan token
    return c.Redirect("/docs/v1.0?token=" + tokenString)
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
    // Inject JS to set token from URL/localStorage to Swagger UI
    html := `
    <script>
    window.addEventListener('DOMContentLoaded', function() {
        // Ambil token dari URL
        function getTokenFromUrl() {
            const params = new URLSearchParams(window.location.search);
            return params.get('token');
        }
        var token = getTokenFromUrl();
        if (token) {
            localStorage.setItem('swagger_jwt', token);
        } else {
            token = localStorage.getItem('swagger_jwt');
        }
        // Tunggu Swagger UI siap
        function setSwaggerToken() {
            if (window.ui && token) {
                window.ui.preauthorizeApiKey('BearerAuth', 'Bearer ' + token);
            } else {
                setTimeout(setSwaggerToken, 500);
            }
        }
        setSwaggerToken();
    });
    </script>
    `
    c.Set("Content-Type", "text/html")
    c.Response().AppendBodyString(html)
    return swagger.HandlerDefault(c)
}