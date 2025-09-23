package middlewares

import (
    "github.com/gofiber/fiber/v2"
    "github.com/golang-jwt/jwt/v4"
    "log"
    "monitoring-server/session"
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
    // Debug: log incoming request method and path
    log.Printf("[JwtMiddleware] %s %s", c.Method(), c.Path())

    authHeader := c.Get("Authorization")
    if authHeader == "" {
        log.Printf("[JwtMiddleware] Missing Authorization header for %s %s", c.Method(), c.Path())
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
        log.Printf("[JwtMiddleware] Token parse/validate error: %v", err)
        return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{"error": "Invalid token"})
    }
    
    // Extract claims from token
    if claims, ok := token.Claims.(jwt.MapClaims); ok && token.Valid {
        if username, ok := claims["username"].(string); ok {
            c.Locals("username", username)
        }
        
        // Handle session_id if present (Redis mode)
            if sessionID, ok := claims["session_id"].(string); ok {
            c.Locals("session_id", sessionID)
            c.Locals("token", tokenStr)

            // Validate session in Redis (if available)
            if session.Session != nil {
                sessionData, err := session.Session.GetSession(sessionID)
                if err != nil {
                    log.Printf("[JwtMiddleware] Session validation failed for session_id=%s: %v", sessionID, err)
                    return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{"error": "Session expired or invalid"})
                }
                log.Printf("[JwtMiddleware] Session validated for user=%v session_id=%s", sessionData.Username, sessionID)

                // Optional: Extend session on activity
                session.Session.ExtendSession(sessionID, time.Hour*24)

                c.Locals("session_data", sessionData)
            }
        }
        // If no session_id in claims, it's stateless JWT mode - which is OK
    }
    
    return c.Next()
}