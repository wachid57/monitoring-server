package middlewares

import (
    "github.com/gofiber/fiber/v2"
    "github.com/golang-jwt/jwt/v4"
)

var jwtSecret = []byte("supersecretkey")

func JwtMiddleware(c *fiber.Ctx) error {
    tokenStr := c.Get("Authorization")
    if tokenStr == "" {
        return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{"error": "Missing token"})
    }
    token, err := jwt.Parse(tokenStr, func(token *jwt.Token) (interface{}, error) {
        return jwtSecret, nil
    })
    if err != nil || !token.Valid {
        return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{"error": "Invalid token"})
    }
    return c.Next()
}