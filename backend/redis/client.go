package redisclient

import (
    "context"
    "os"
    "time"
    "github.com/redis/go-redis/v9"
)

var Rdb *redis.Client

func Init() error {
    addr := os.Getenv("REDIS_ADDR")
    if addr == "" { addr = "localhost:6379" }
    db := 0
    Rdb = redis.NewClient(&redis.Options{Addr: addr, DB: db})
    ctx, cancel := context.WithTimeout(context.Background(), 3*time.Second)
    defer cancel()
    return Rdb.Ping(ctx).Err()
}
