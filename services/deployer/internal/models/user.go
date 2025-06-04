package models

import (
	"time"

	"github.com/google/uuid"
	"golang.org/x/crypto/bcrypt"
	"gorm.io/gorm"
)

type User struct {
	ID               string     `json:"id" gorm:"type:uuid;primaryKey;default:gen_random_uuid()"`
	Name             string     `json:"name" gorm:"not null"`
	Email            string     `json:"email" gorm:"uniqueIndex;not null"`
	PasswordHash     string     `json:"-" gorm:"not null"`
	Admin            bool       `json:"admin" gorm:"default:false"`
	Activated        bool       `json:"activated" gorm:"default:false"`
	ActivationDigest string     `json:"-"`
	ActivatedAt      *time.Time `json:"activated_at"`
	ResetDigest      string     `json:"-"`
	ResetSentAt      *time.Time `json:"reset_sent_at"`
	CreatedAt        time.Time  `json:"created_at"`
	UpdatedAt        time.Time  `json:"updated_at"`

	// Associations
	Microposts           []Micropost    `json:"microposts,omitempty" gorm:"foreignKey:UserID;constraint:OnDelete:CASCADE"`
	ActiveRelationships  []Relationship `json:"-" gorm:"foreignKey:FollowerID;constraint:OnDelete:CASCADE"`
	PassiveRelationships []Relationship `json:"-" gorm:"foreignKey:FollowedID;constraint:OnDelete:CASCADE"`
}

type UserResponse struct {
	ID          string     `json:"id"`
	Name        string     `json:"name"`
	Email       string     `json:"email"`
	Admin       bool       `json:"admin"`
	Activated   bool       `json:"activated"`
	ActivatedAt *time.Time `json:"activated_at"`
	CreatedAt   time.Time  `json:"created_at"`
	UpdatedAt   time.Time  `json:"updated_at"`
	GravatarURL string     `json:"gravatar_url"`
}

type CreateUserRequest struct {
	Name                 string `json:"name" binding:"required,min=1,max=50"`
	Email                string `json:"email" binding:"required,email"`
	Password             string `json:"password" binding:"required,min=6"`
	PasswordConfirmation string `json:"password_confirmation" binding:"required"`
}

type UpdateUserRequest struct {
	Name     string `json:"name" binding:"required,min=1,max=50"`
	Email    string `json:"email" binding:"required,email"`
	Password string `json:"password,omitempty" binding:"omitempty,min=6"`
}

type LoginRequest struct {
	Email    string `json:"email" binding:"required,email"`
	Password string `json:"password" binding:"required"`
}

func (u *User) SetPassword(password string) error {
	hash, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
	if err != nil {
		return err
	}
	u.PasswordHash = string(hash)
	return nil
}

func (u *User) CheckPassword(password string) bool {
	err := bcrypt.CompareHashAndPassword([]byte(u.PasswordHash), []byte(password))
	return err == nil
}

func (u *User) ToResponse() UserResponse {
	return UserResponse{
		ID:          u.ID,
		Name:        u.Name,
		Email:       u.Email,
		Admin:       u.Admin,
		Activated:   u.Activated,
		ActivatedAt: u.ActivatedAt,
		CreatedAt:   u.CreatedAt,
		UpdatedAt:   u.UpdatedAt,
		GravatarURL: u.GravatarURL(),
	}
}

func (u *User) GravatarURL() string {
	return GenerateGravatarURL(u.Email)
}

func (u *User) BeforeCreate(tx *gorm.DB) error {
	if u.ID == "" {
		u.ID = uuid.NewString()
	}
	u.CreatedAt = time.Now()
	u.UpdatedAt = time.Now()
	return nil
}

func (u *User) BeforeUpdate(tx *gorm.DB) error {
	u.UpdatedAt = time.Now()
	return nil
}
