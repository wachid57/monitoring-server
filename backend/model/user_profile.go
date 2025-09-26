package model

import (
    "time"
    "gorm.io/datatypes"
)

// UserProfile stores profile metadata for a user
type UserProfile struct {
    ID             uint       `gorm:"primaryKey" json:"id"`
    UserID         uint       `gorm:"uniqueIndex" json:"user_id"`
    Bio            string     `gorm:"type:text" json:"bio"`
    Company        string     `json:"company"`
    Website        string     `json:"website"`
    Location       string     `json:"location"`
    AvatarURL      string     `json:"avatar_url"`
    CoverURL       string     `json:"cover_url"`
    PostsCount     int        `gorm:"default:0" json:"posts_count"`
    FollowersCount int        `gorm:"default:0" json:"followers_count"`
    FollowingCount int        `gorm:"default:0" json:"following_count"`
    CreatedAt      time.Time  `json:"created_at"`
    UpdatedAt      time.Time  `json:"updated_at"`
    DeletedAt      *time.Time `gorm:"index" json:"deleted_at"`
}

// UserFriend represents a friendship relation (bidirectional stored as two rows or use status)
type UserFriend struct {
    ID        uint       `gorm:"primaryKey" json:"id"`
    UserID    uint       `gorm:"index" json:"user_id"`
    FriendID  uint       `gorm:"index" json:"friend_id"`
    Status    string     `json:"status"` // pending, accepted, blocked
    CreatedAt time.Time  `json:"created_at"`
    UpdatedAt time.Time  `json:"updated_at"`
    DeletedAt *time.Time `gorm:"index" json:"deleted_at"`
}

// UserFollower represents follower relation (one-directional)
type UserFollower struct {
    ID          uint       `gorm:"primaryKey" json:"id"`
    UserID      uint       `gorm:"index" json:"user_id"`
    FollowerID  uint       `gorm:"index" json:"follower_id"`
    CreatedAt   time.Time  `json:"created_at"`
    DeletedAt   *time.Time `gorm:"index" json:"deleted_at"`
}

// UserPhoto stores gallery photos for user profiles
type UserPhoto struct {
    ID        uint       `gorm:"primaryKey" json:"id"`
    UserID    uint       `gorm:"index" json:"user_id"`
    URL       string     `gorm:"type:text" json:"url"`
    Caption   string     `gorm:"type:text" json:"caption"`
    CreatedAt time.Time  `json:"created_at"`
    UpdatedAt time.Time  `json:"updated_at"`
    DeletedAt *time.Time `gorm:"index" json:"deleted_at"`
}

// UserArticle stores posts/articles content; Data keeps rich content in JSON used by UI
type UserArticle struct {
    ID        uint           `gorm:"primaryKey" json:"id"`
    UserID    uint           `gorm:"index" json:"user_id"`
    Title     string         `json:"title"`
    Data      datatypes.JSON `gorm:"type:longtext" json:"data"` // JSON: content, images, video, likes, comments
    CreatedAt time.Time      `json:"created_at"`
    UpdatedAt time.Time      `json:"updated_at"`
    DeletedAt *time.Time     `gorm:"index" json:"deleted_at"`
}
