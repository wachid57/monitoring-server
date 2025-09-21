package auth

import (
	"github.com/gofiber/fiber/v2"
	"github.com/golang-jwt/jwt/v4"
	"golang.org/x/crypto/bcrypt"
	"mini-npm-backend/database"
	"mini-npm-backend/model"
	"mini-npm-backend/session"
	"os"
	"time"
	"regexp"
	"unicode"
	"crypto/rand"
	"encoding/hex"
)

func getJWTSecret() []byte {
	secret := os.Getenv("JWT_SECRET")
	if secret == "" {
		secret = "supersecretkey" // fallback, sebaiknya set di environment
	}
	return []byte(secret)
}

// generateSecureToken generates a cryptographically secure random token
func generateSecureToken() (string, error) {
	bytes := make([]byte, 32)
	if _, err := rand.Read(bytes); err != nil {
		return "", err
	}
	return hex.EncodeToString(bytes), nil
}

// LoginRequest is the request body for login
type LoginRequest struct {
	Username string `json:"username"`
	Password string `json:"password"`
}

// RegisterRequest is the request body for register
type RegisterRequest struct {
	Username string `json:"username"`
	Password string `json:"password"`
}

// ChangePasswordRequest is the request body for changing password
type ChangePasswordRequest struct {
	CurrentPassword string `json:"current_password"`
	NewPassword     string `json:"new_password"`
}

// validatePassword checks if password meets security requirements
func validatePassword(password string) error {
	if len(password) < 8 {
		return fiber.NewError(fiber.StatusBadRequest, "Password must be at least 8 characters long")
	}
	
	var hasUpper, hasLower, hasDigit, hasSpecial bool
	for _, char := range password {
		switch {
		case unicode.IsUpper(char):
			hasUpper = true
		case unicode.IsLower(char):
			hasLower = true
		case unicode.IsDigit(char):
			hasDigit = true
		case unicode.IsPunct(char) || unicode.IsSymbol(char):
			hasSpecial = true
		}
	}
	
	if !hasUpper {
		return fiber.NewError(fiber.StatusBadRequest, "Password must contain at least one uppercase letter")
	}
	if !hasLower {
		return fiber.NewError(fiber.StatusBadRequest, "Password must contain at least one lowercase letter")
	}
	if !hasDigit {
		return fiber.NewError(fiber.StatusBadRequest, "Password must contain at least one digit")
	}
	if !hasSpecial {
		return fiber.NewError(fiber.StatusBadRequest, "Password must contain at least one special character")
	}
	
	return nil
}

// validateUsername checks if username meets requirements
func validateUsername(username string) error {
	if len(username) < 3 {
		return fiber.NewError(fiber.StatusBadRequest, "Username must be at least 3 characters long")
	}
	
	// Username should only contain alphanumeric and underscore
	matched, _ := regexp.MatchString("^[a-zA-Z0-9_]+$", username)
	if !matched {
		return fiber.NewError(fiber.StatusBadRequest, "Username can only contain letters, numbers, and underscores")
	}
	
	return nil
}

// LoginHandler godoc
// @Summary Login user
// @Tags Auth
// @Accept json
// @Produce json
// @Param login body auth.LoginRequest true "Login credentials"
// @Success 200 {object} map[string]string
// @Failure 400 {object} map[string]string
// @Failure 401 {object} map[string]string
// @Router /auth/login [post]
// Tidak ada annotation @Security
func LoginHandler(c *fiber.Ctx) error {
	var req LoginRequest
	if err := c.BodyParser(&req); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "Invalid request"})
	}
	var user model.User
	if err := database.DB.Where("username = ?", req.Username).First(&user).Error; err != nil {
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{"error": "Invalid credentials"})
	}
	if bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(req.Password)) != nil {
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{"error": "Invalid credentials"})
	}
	
	// Generate secure session token
	sessionToken, err := generateSecureToken()
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": "Could not generate session"})
	}
	
	// Create JWT token with session reference
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"username":     req.Username,
		"session_id":   sessionToken,
		"exp":          time.Now().Add(time.Hour * 24).Unix(),
	})
	t, err := token.SignedString(getJWTSecret())
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": "Could not login"})
	}
	
	// Store session in Redis
	if session.Session != nil {
		sessionData := session.SessionData{
			Username:  req.Username,
			LoginTime: time.Now(),
			IP:        c.IP(),
			UserAgent: c.Get("User-Agent"),
		}
		
		if err := session.Session.StoreSession(sessionToken, sessionData, time.Hour*24); err != nil {
			// Log error but don't fail login - fallback to stateless JWT
			// In production, you might want to log this error
		}
	}
	
	return c.JSON(fiber.Map{
		"token":      t,
		"expires_in": 86400, // 24 hours in seconds
		"user":       fiber.Map{"username": req.Username},
	})
}

// LogoutHandler godoc
// @Summary Logout user
// @Tags Auth
// @Produce json
// @Success 200 {object} map[string]string
// @Security BearerAuth
// @Router /auth/logout [post]
func LogoutHandler(c *fiber.Ctx) error {
	// Try to get session ID from JWT token
	if sessionID := c.Locals("session_id"); sessionID != nil {
		if session.Session != nil {
			// Delete session from Redis
			session.Session.DeleteSession(sessionID.(string))
			
			// Blacklist the token
			if tokenStr := c.Locals("token"); tokenStr != nil {
				session.Session.BlacklistToken(tokenStr.(string), time.Hour*24)
			}
		}
	}
	
	return c.Status(fiber.StatusOK).JSON(fiber.Map{"message": "Logout successful"})
}

// RegisterHandler godoc
// @Summary Register user
// @Tags Auth
// @Accept json
// @Produce json
// @Param register body auth.RegisterRequest true "Register credentials"
// @Success 201 {object} map[string]string
// @Failure 400 {object} map[string]string
// @Failure 409 {object} map[string]string
// @Router /auth/register [post]
func RegisterHandler(c *fiber.Ctx) error {
	var req RegisterRequest
	if err := c.BodyParser(&req); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "Invalid request"})
	}
	
	// Validate username
	if err := validateUsername(req.Username); err != nil {
		return err
	}
	
	// Validate password
	if err := validatePassword(req.Password); err != nil {
		return err
	}
	
	var user model.User
	if err := database.DB.Where("username = ?", req.Username).First(&user).Error; err == nil {
		return c.Status(fiber.StatusConflict).JSON(fiber.Map{"error": "Username already exists"})
	}
	
	// Use higher cost for better security
	hashed, err := bcrypt.GenerateFromPassword([]byte(req.Password), bcrypt.DefaultCost+2)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": "Failed to hash password"})
	}
	newUser := model.User{
		Username: req.Username,
		Password: string(hashed),
	}
	if err := database.DB.Create(&newUser).Error; err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": "Failed to create user"})
	}
	return c.Status(fiber.StatusCreated).JSON(fiber.Map{"message": "User registered successfully"})
}

// ChangePasswordHandler godoc
// @Summary Change user password
// @Tags Auth
// @Accept json
// @Produce json
// @Param password body auth.ChangePasswordRequest true "Password change request"
// @Success 200 {object} map[string]string
// @Failure 400 {object} map[string]string
// @Failure 401 {object} map[string]string
// @Security BearerAuth
// @Router /auth/change-password [post]
func ChangePasswordHandler(c *fiber.Ctx) error {
	var req ChangePasswordRequest
	if err := c.BodyParser(&req); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "Invalid request"})
	}
	
	// Get username from JWT token
	username := c.Locals("username").(string)
	
	// Validate new password
	if err := validatePassword(req.NewPassword); err != nil {
		return err
	}
	
	// Get user from database
	var user model.User
	if err := database.DB.Where("username = ?", username).First(&user).Error; err != nil {
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{"error": "User not found"})
	}
	
	// Verify current password
	if err := bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(req.CurrentPassword)); err != nil {
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{"error": "Current password is incorrect"})
	}
	
	// Hash new password
	hashed, err := bcrypt.GenerateFromPassword([]byte(req.NewPassword), bcrypt.DefaultCost+2)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": "Failed to hash password"})
	}
	
	// Update password
	if err := database.DB.Model(&user).Update("password", string(hashed)).Error; err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": "Failed to update password"})
	}
	
	return c.JSON(fiber.Map{"message": "Password updated successfully"})
}

// GetActiveSessionsHandler godoc
// @Summary Get active sessions for current user
// @Tags Auth
// @Produce json
// @Success 200 {object} map[string]interface{}
// @Security BearerAuth
// @Router /auth/sessions [get]
func GetActiveSessionsHandler(c *fiber.Ctx) error {
	username := c.Locals("username").(string)
	
	if session.Session == nil {
		return c.JSON(fiber.Map{
			"message": "Session management not available",
			"count":   0,
		})
	}
	
	count, err := session.Session.GetActiveSessionsCount(username)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": "Failed to get session count"})
	}
	
	return c.JSON(fiber.Map{
		"username":        username,
		"active_sessions": count,
	})
}
