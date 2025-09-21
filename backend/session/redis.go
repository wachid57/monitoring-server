package session

import (
	"context"
	"encoding/json"
	"os"
	"time"

	"github.com/redis/go-redis/v9"
)

type RedisSession struct {
	client *redis.Client
	ctx    context.Context
}

type SessionData struct {
	Username  string    `json:"username"`
	LoginTime time.Time `json:"login_time"`
	IP        string    `json:"ip"`
	UserAgent string    `json:"user_agent"`
}

var Session *RedisSession

func InitRedis() error {
	addr := os.Getenv("REDIS_ADDR")
	if addr == "" {
		addr = "localhost:6379"
	}
	
	password := os.Getenv("REDIS_PASSWORD")
	
	rdb := redis.NewClient(&redis.Options{
		Addr:     addr,
		Password: password,
		DB:       0,
	})
	
	ctx := context.Background()
	
	// Test connection
	_, err := rdb.Ping(ctx).Result()
	if err != nil {
		return err
	}
	
	Session = &RedisSession{
		client: rdb,
		ctx:    ctx,
	}
	
	return nil
}

// StoreSession stores user session data
func (r *RedisSession) StoreSession(token string, data SessionData, expiry time.Duration) error {
	sessionJSON, err := json.Marshal(data)
	if err != nil {
		return err
	}
	
	return r.client.Set(r.ctx, "session:"+token, sessionJSON, expiry).Err()
}

// GetSession retrieves user session data
func (r *RedisSession) GetSession(token string) (*SessionData, error) {
	val, err := r.client.Get(r.ctx, "session:"+token).Result()
	if err != nil {
		return nil, err
	}
	
	var data SessionData
	err = json.Unmarshal([]byte(val), &data)
	if err != nil {
		return nil, err
	}
	
	return &data, nil
}

// DeleteSession removes session (for logout)
func (r *RedisSession) DeleteSession(token string) error {
	return r.client.Del(r.ctx, "session:"+token).Err()
}

// BlacklistToken adds token to blacklist
func (r *RedisSession) BlacklistToken(token string, expiry time.Duration) error {
	return r.client.Set(r.ctx, "blacklist:"+token, "1", expiry).Err()
}

// IsTokenBlacklisted checks if token is blacklisted
func (r *RedisSession) IsTokenBlacklisted(token string) bool {
	_, err := r.client.Get(r.ctx, "blacklist:"+token).Result()
	return err == nil
}

// ExtendSession extends session expiry
func (r *RedisSession) ExtendSession(token string, expiry time.Duration) error {
	return r.client.Expire(r.ctx, "session:"+token, expiry).Err()
}

// GetActiveSessionsCount gets number of active sessions for user
func (r *RedisSession) GetActiveSessionsCount(username string) (int64, error) {
	keys, err := r.client.Keys(r.ctx, "session:*").Result()
	if err != nil {
		return 0, err
	}
	
	count := int64(0)
	for _, key := range keys {
		val, err := r.client.Get(r.ctx, key).Result()
		if err != nil {
			continue
		}
		
		var data SessionData
		if json.Unmarshal([]byte(val), &data) == nil && data.Username == username {
			count++
		}
	}
	
	return count, nil
}
