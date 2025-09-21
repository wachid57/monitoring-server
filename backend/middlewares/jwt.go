package middlewares

import (
    "github.com/gofiber/fiber/v2"
    "github.com/golang-jwt/jwt/v4"
    "mini-npm-backend/session"
    "os"
    "strings"
    "time"
)

func getJWTSecret() []byte {
	secret := os.Getenv("JWT_SECRET")
	if secret == "" {
		secret = "supersecretkey" // fallback, sebaiknya set di environment
	}
	return []byte(secret)
}

func JwtMiddleware(c *fiber.Ctx) error {
    authHeader := c.Get("Authorization")
    if authHeader == "" {
        return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{"error": "Missing token"})
    }
    
    // Handle Bearer token format
    tokenStr := authHeader
    if strings.HasPrefix(authHeader, "Bearer ") {
        tokenStr = strings.TrimPrefix(authHeader, "Bearer ")
    }
    
    // Check if token is blacklisted (if Redis is available)
    if session.Session != nil && session.Session.IsTokenBlacklisted(tokenStr) {
        return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{"error": "Token has been revoked"})
    }
    
    token, err := jwt.Parse(tokenStr, func(token *jwt.Token) (interface{}, error) {
        return getJWTSecret(), nil
    })
    
    if err != nil || !token.Valid {
        return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{"error": "Invalid token"})
    }
    
    // Extract claims from token
    if claims, ok := token.Claims.(jwt.MapClaims); ok && token.Valid {
        if username, ok := claims["username"].(string); ok {
            c.Locals("username", username)
        }
        
        if sessionID, ok := claims["session_id"].(string); ok {
            c.Locals("session_id", sessionID)
            c.Locals("token", tokenStr)
            
            // Validate session in Redis (if available)
            if session.Session != nil {
                sessionData, err := session.Session.GetSession(sessionID)
                if err != nil {
                    return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{"error": "Session expired or invalid"})
                }
                
                // Optional: Extend session on activity
                session.Session.ExtendSession(sessionID, time.Hour*24)
                
                c.Locals("session_data", sessionData)
            }
        }
    }
    
    return c.Next()
}