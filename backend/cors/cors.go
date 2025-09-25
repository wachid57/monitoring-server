package cors

import (
    "os"
    "strings"

    "github.com/gofiber/fiber/v2"
    fiberCors "github.com/gofiber/fiber/v2/middleware/cors"
)

// truthy reports whether an env string means true
func truthy(s string) bool {
    switch strings.ToLower(strings.TrimSpace(s)) {
    case "1", "true", "yes", "on":
        return true
    default:
        return false
    }
}

// SetupCORS configures CORS based on environment variables.
// ENV:
// - ENABLE_CORS=true|false (default false) -> when true, enable CORS
// - CORS_DOMAIN=comma,separated,origins or hostnames (e.g., http://localhost:5173,https://app.example.com or localhost,192.168.21.167)
//   If hostnames are provided without scheme/port, common dev variants are added automatically.
func SetupCORS(app *fiber.App) {
    // Back-compat and new envs:
    // - ENABLE_CORS=true|1|yes|on enables CORS
    // - CORS_ENABLE=true|1|yes|on enables CORS
    // - CORS_ENABLE=all enables CORS for all origins ("*")
    // - CORS_DOMAIN=comma list of origins/hosts

    ce := strings.ToLower(strings.TrimSpace(os.Getenv("CORS_ENABLE")))
    ec := strings.ToLower(strings.TrimSpace(os.Getenv("ENABLE_CORS")))

    // Shortcut: allow all if CORS_ENABLE=all or ENABLE_CORS=all
    if ce == "all" || ec == "all" {
        app.Use(fiberCors.New(fiberCors.Config{
            AllowOrigins:     "*",
            AllowHeaders:     "Origin, Content-Type, Accept, Authorization",
            AllowMethods:     "GET,POST,PUT,DELETE,OPTIONS",
            // With wildcard origins, do not allow credentials to satisfy CORS spec
            AllowCredentials: false,
        }))
        return
    }

    // Determine if enabled (truthy in either var)
    enabled := truthy(ec) || truthy(ce)
    if !enabled {
        // CORS disabled: do nothing
        return
    }

    raw := strings.TrimSpace(os.Getenv("CORS_DOMAIN"))
    allowOrigins := "*" // if none provided, default to all
    if raw != "" {
        // Build a list of acceptable origins
        tokens := strings.Split(raw, ",")
        seen := map[string]struct{}{}
        var origins []string
        add := func(v string) {
            v = strings.TrimSpace(v)
            if v == "" { return }
            if _, ok := seen[v]; ok { return }
            seen[v] = struct{}{}
            origins = append(origins, v)
        }
        for _, t := range tokens {
            t = strings.TrimSpace(t)
            if t == "" { continue }
            lower := strings.ToLower(t)
            if strings.HasPrefix(lower, "http://") || strings.HasPrefix(lower, "https://") {
                add(t)
                continue
            }
            // Assume bare hostname/IP; add common dev origins
            add("http://" + t)
            add("https://" + t)
            // Common dev ports
            add("http://" + t + ":3000")
            add("http://" + t + ":5173")
            add("http://" + t + ":7080")
            add("http://" + t + ":8080")
            add("https://" + t + ":443")
        }
        if len(origins) > 0 {
            allowOrigins = strings.Join(origins, ",")
        }
    }

    app.Use(fiberCors.New(fiberCors.Config{
        AllowOrigins:     allowOrigins,
        AllowHeaders:     "Origin, Content-Type, Accept, Authorization",
        AllowMethods:     "GET,POST,PUT,DELETE,OPTIONS",
        // Credentials are only safe with explicit origins, not wildcard
        AllowCredentials: allowOrigins != "*",
    }))
}
