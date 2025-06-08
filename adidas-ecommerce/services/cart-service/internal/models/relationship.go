package models

import (
	"time"

	"github.com/google/uuid"
	"gorm.io/gorm"
)

type Relationship struct {
	ID         string    `json:"id" gorm:"type:uuid;primaryKey;default:gen_random_uuid()"`
	FollowerID string    `json:"follower_id" gorm:"type:uuid;not null;index"`
	FollowedID string    `json:"followed_id" gorm:"type:uuid;not null;index"`
	Follower   User      `json:"follower,omitempty" gorm:"foreignKey:FollowerID"`
	Followed   User      `json:"followed,omitempty" gorm:"foreignKey:FollowedID"`
	CreatedAt  time.Time `json:"created_at"`
	UpdatedAt  time.Time `json:"updated_at"`
}

type RelationshipResponse struct {
	ID         string       `json:"id"`
	FollowerID string       `json:"follower_id"`
	FollowedID string       `json:"followed_id"`
	Follower   UserResponse `json:"follower"`
	Followed   UserResponse `json:"followed"`
	CreatedAt  time.Time    `json:"created_at"`
}

func (r *Relationship) ToResponse() RelationshipResponse {
	return RelationshipResponse{
		ID:         r.ID,
		FollowerID: r.FollowerID,
		FollowedID: r.FollowedID,
		Follower:   r.Follower.ToResponse(),
		Followed:   r.Followed.ToResponse(),
		CreatedAt:  r.CreatedAt,
	}
}

func (r *Relationship) BeforeCreate(tx *gorm.DB) error {
	if r.ID == "" {
		r.ID = uuid.NewString()
	}
	r.CreatedAt = time.Now()
	r.UpdatedAt = time.Now()
	return nil
}

func (r *Relationship) BeforeUpdate(tx *gorm.DB) error {
	r.UpdatedAt = time.Now()
	return nil
}
