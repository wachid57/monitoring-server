package handler

import (
    "encoding/json"
    "github.com/gofiber/fiber/v2"
    "monitoring-server/database"
    "monitoring-server/model"
    "strconv"
)

// helper to resolve user id ("me" uses JWT username -> user record)
func resolveUserID(c *fiber.Ctx) (uint, error) {
    idParam := c.Params("id")
    if idParam == "me" || idParam == "" {
        // try to find by username from token
        if uname, ok := c.Locals("username").(string); ok && uname != "" {
            var u model.User
            if err := database.DB.Where("username = ?", uname).First(&u).Error; err == nil {
                return u.ID, nil
            }
        }
        // fallback not found
        return 0, fiber.ErrUnauthorized
    }
    n, err := strconv.Atoi(idParam)
    if err != nil {
        return 0, fiber.ErrBadRequest
    }
    return uint(n), nil
}

// GET /profiles/users/:id/profile
func GetUserProfile(c *fiber.Ctx) error {
    uid, err := resolveUserID(c)
    if err != nil { return err }
    var p model.UserProfile
    if err := database.DB.Where("user_id = ?", uid).First(&p).Error; err != nil {
        // create empty profile if missing
        p = model.UserProfile{UserID: uid}
        _ = database.DB.Create(&p).Error
    }
    return c.JSON(p)
}

// GET /profiles/users/:id/photos
func GetUserPhotos(c *fiber.Ctx) error {
    uid, err := resolveUserID(c)
    if err != nil { return err }
    var photos []model.UserPhoto
    if err := database.DB.Where("user_id = ?", uid).Order("id desc").Find(&photos).Error; err != nil {
        return c.Status(500).JSON(fiber.Map{"error": "Failed to fetch photos"})
    }
    // map to UI structure {id, cover}
    type item struct { ID uint `json:"id"`; Cover string `json:"cover"` }
    out := make([]item, 0, len(photos))
    for _, ph := range photos {
        out = append(out, item{ID: ph.ID, Cover: ph.URL})
    }
    return c.JSON(out)
}

// GET /profiles/users/:id/followers
func GetUserFollowers(c *fiber.Ctx) error {
    uid, err := resolveUserID(c)
    if err != nil { return err }
    var followers []model.UserFollower
    if err := database.DB.Where("user_id = ?", uid).Find(&followers).Error; err != nil {
        return c.Status(500).JSON(fiber.Map{"error": "Failed to fetch followers"})
    }
    return c.JSON(followers)
}

// GET /profiles/users/:id/friends
func GetUserFriends(c *fiber.Ctx) error {
    uid, err := resolveUserID(c)
    if err != nil { return err }
    var friends []model.UserFriend
    if err := database.DB.Where("user_id = ? AND status = ?", uid, "accepted").Find(&friends).Error; err != nil {
        return c.Status(500).JSON(fiber.Map{"error": "Failed to fetch friends"})
    }
    return c.JSON(friends)
}

// GET /profiles/users/:id/posts
func GetUserPosts(c *fiber.Ctx) error {
    uid, err := resolveUserID(c)
    if err != nil { return err }
    var arts []model.UserArticle
    if err := database.DB.Where("user_id = ?", uid).Order("id desc").Find(&arts).Error; err != nil {
        return c.Status(500).JSON(fiber.Map{"error": "Failed to fetch posts"})
    }
    // UI expects array of objects with {id, profile:{avatar,name,time}, data:{content, images[], video, likes, comments[]}}
    // We keep that shape directly in Data JSON field; return as-is with envelope including ID for react keys
    type PostOut struct {
        ID   uint            `json:"id"`
        Data json.RawMessage `json:"data"`
    }
    outs := make([]PostOut, 0, len(arts))
    for _, a := range arts {
        outs = append(outs, PostOut{ID: a.ID, Data: json.RawMessage(a.Data)})
    }
    return c.JSON(outs)
}

// POST /profiles/users/posts/like
func LikePost(c *fiber.Ctx) error {
    var body struct { PostID uint `json:"postId"` }
    if err := c.BodyParser(&body); err != nil { return fiber.ErrBadRequest }
    var a model.UserArticle
    if err := database.DB.First(&a, body.PostID).Error; err != nil { return fiber.ErrNotFound }
    // Let the client manage like state; backend simply stores Data blob
    // Here we just echo current list; in real app we'd update JSON
    return c.JSON(fiber.Map{"status":"ok"})
}

// POST /profiles/users/posts/comments/add
func AddPostComment(c *fiber.Ctx) error {
    var body struct {
        PostID  uint            `json:"postId"`
        Comment json.RawMessage `json:"comment"`
    }
    if err := c.BodyParser(&body); err != nil { return fiber.ErrBadRequest }
    // load and append in JSON on real impl; return ok for now
    return c.JSON(fiber.Map{"status":"ok"})
}

// POST /profiles/users/posts/replies/add
func AddPostReply(c *fiber.Ctx) error {
    var body struct {
        PostID    uint            `json:"postId"`
        CommentID string          `json:"commentId"`
        Reply     json.RawMessage `json:"reply"`
    }
    if err := c.BodyParser(&body); err != nil { return fiber.ErrBadRequest }
    return c.JSON(fiber.Map{"status":"ok"})
}
