package models

import (
	"time"

	"github.com/google/uuid"
	"gorm.io/gorm"
)

type Micropost struct {
	ID        string    `json:"id" gorm:"type:uuid;primaryKey;default:gen_random_uuid()"`
	Content   string    `json:"content" gorm:"not null;size:140"`
	UserID    string    `json:"user_id" gorm:"type:uuid;not null;index"`
	User      User      `json:"user,omitempty" gorm:"foreignKey:UserID"`
	CreatedAt time.Time `json:"created_at"`
	UpdatedAt time.Time `json:"updated_at"`
}

type MicropostResponse struct {
	ID        string       `json:"id"`
	Content   string       `json:"content"`
	UserID    string       `json:"user_id"`
	User      UserResponse `json:"user"`
	CreatedAt time.Time    `json:"created_at"`
	UpdatedAt time.Time    `json:"updated_at"`
}

type CreateMicropostRequest struct {
	Content string `json:"content" binding:"required,max=140"`
}

type UpdateMicropostRequest struct {
	Content string `json:"content" binding:"required,max=140"`
}

func (m *Micropost) ToResponse() MicropostResponse {
	return MicropostResponse{
		ID:        m.ID,
		Content:   m.Content,
		UserID:    m.UserID,
		User:      m.User.ToResponse(),
		CreatedAt: m.CreatedAt,
		UpdatedAt: m.UpdatedAt,
	}
}

func (m *Micropost) BeforeCreate(tx *gorm.DB) error {
	if m.ID == "" {
		m.ID = uuid.NewString()
	}
	m.CreatedAt = time.Now()
	m.UpdatedAt = time.Now()
	return nil
}

func (m *Micropost) BeforeUpdate(tx *gorm.DB) error {
	m.UpdatedAt = time.Now()
	return nil
}
