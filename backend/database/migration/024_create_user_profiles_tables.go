package migration

import (
    "gorm.io/gorm"
    "monitoring-server/model"
)

func CreateUserProfilesTables(db *gorm.DB) error {
    return db.AutoMigrate(
        &model.UserProfile{},
        &model.UserFriend{},
        &model.UserFollower{},
        &model.UserPhoto{},
        &model.UserArticle{},
    )
}
