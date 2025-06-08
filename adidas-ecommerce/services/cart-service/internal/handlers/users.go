package handlers

import (
	"net/http"
	"strconv"

	"go-boilerplate/internal/config"
	"go-boilerplate/internal/models"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
	"gorm.io/gorm"
)

type UserHandler struct {
	db  *gorm.DB
	cfg *config.Config
}

func NewUserHandler(db *gorm.DB, cfg *config.Config) *UserHandler {
	return &UserHandler{db: db, cfg: cfg}
}

func (h *UserHandler) Index(c *gin.Context) {
	page, _ := strconv.Atoi(c.DefaultQuery("page", "1"))
	limit := 30
	offset := (page - 1) * limit

	var users []models.User
	var total int64

	h.db.Model(&models.User{}).Where("activated = ?", true).Count(&total)
	h.db.Where("activated = ?", true).Limit(limit).Offset(offset).Find(&users)

	totalPages := int((total + int64(limit) - 1) / int64(limit))

	c.HTML(http.StatusOK, "users_index.html", gin.H{
		"users":       users,
		"currentPage": page,
		"totalPages":  totalPages,
		"title":       "All users",
	})
}

func (h *UserHandler) Show(c *gin.Context) {
	id := c.Param("id")

	// Validate UUID format
	if _, err := uuid.Parse(id); err != nil {
		c.HTML(http.StatusNotFound, "404.html", gin.H{})
		return
	}

	var user models.User
	if err := h.db.Preload("Microposts").First(&user, "id = ?", id).Error; err != nil {
		c.HTML(http.StatusNotFound, "404.html", gin.H{})
		return
	}

	if !user.Activated {
		c.HTML(http.StatusNotFound, "404.html", gin.H{})
		return
	}

	page, _ := strconv.Atoi(c.DefaultQuery("page", "1"))
	limit := 30
	offset := (page - 1) * limit

	var microposts []models.Micropost
	var total int64

	h.db.Model(&models.Micropost{}).Where("user_id = ?", user.ID).Count(&total)
	h.db.Where("user_id = ?", user.ID).Preload("User").Order("created_at DESC").Limit(limit).Offset(offset).Find(&microposts)

	totalPages := int((total + int64(limit) - 1) / int64(limit))

	// Get following/followers counts
	var followingCount, followersCount int64
	h.db.Model(&models.Relationship{}).Where("follower_id = ?", user.ID).Count(&followingCount)
	h.db.Model(&models.Relationship{}).Where("followed_id = ?", user.ID).Count(&followersCount)

	// Check if current user is following this user
	var isFollowing bool
	if currentUser, exists := c.Get("user"); exists {
		cu := currentUser.(*models.User)
		var relationship models.Relationship
		err := h.db.Where("follower_id = ? AND followed_id = ?", cu.ID, user.ID).First(&relationship).Error
		isFollowing = err == nil
	}

	c.HTML(http.StatusOK, "users_show.html", gin.H{
		"user":           user,
		"microposts":     microposts,
		"currentPage":    page,
		"totalPages":     totalPages,
		"followingCount": followingCount,
		"followersCount": followersCount,
		"isFollowing":    isFollowing,
		"title":          user.Name,
	})
}

func (h *UserHandler) EditForm(c *gin.Context) {
	id := c.Param("id")
	currentUser := c.MustGet("user").(*models.User)

	// Users can only edit their own profile
	if currentUser.ID != id {
		c.Redirect(http.StatusSeeOther, "/")
		return
	}

	c.HTML(http.StatusOK, "users_edit.html", gin.H{
		"user":  currentUser,
		"title": "Edit user",
	})
}

func (h *UserHandler) Update(c *gin.Context) {
	id := c.Param("id")
	currentUser := c.MustGet("user").(*models.User)

	// Users can only edit their own profile
	if currentUser.ID != id {
		c.Redirect(http.StatusSeeOther, "/")
		return
	}

	var req models.UpdateUserRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.HTML(http.StatusUnprocessableEntity, "users_edit.html", gin.H{
			"user":   currentUser,
			"errors": err.Error(),
			"title":  "Edit user",
		})
		return
	}

	// Check if email is already taken by another user
	var existingUser models.User
	if err := h.db.Where("email = ? AND id != ?", req.Email, currentUser.ID).First(&existingUser).Error; err == nil {
		c.HTML(http.StatusUnprocessableEntity, "users_edit.html", gin.H{
			"user":   currentUser,
			"errors": "Email has already been taken",
			"title":  "Edit user",
		})
		return
	}

	currentUser.Name = req.Name
	currentUser.Email = req.Email

	if req.Password != "" {
		if err := currentUser.SetPassword(req.Password); err != nil {
			c.HTML(http.StatusInternalServerError, "users_edit.html", gin.H{
				"user":   currentUser,
				"errors": "Failed to update password",
				"title":  "Edit user",
			})
			return
		}
	}

	if err := h.db.Save(currentUser).Error; err != nil {
		c.HTML(http.StatusInternalServerError, "users_edit.html", gin.H{
			"user":   currentUser,
			"errors": "Failed to update user",
			"title":  "Edit user",
		})
		return
	}

	c.Redirect(http.StatusSeeOther, "/users/"+id)
}

func (h *UserHandler) Delete(c *gin.Context) {
	id := c.Param("id")

	// Validate UUID format
	if _, err := uuid.Parse(id); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid user ID format"})
		return
	}

	var user models.User
	if err := h.db.First(&user, "id = ?", id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "User not found"})
		return
	}

	if err := h.db.Delete(&user).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to delete user"})
		return
	}

	c.Redirect(http.StatusSeeOther, "/users")
}

func (h *UserHandler) Following(c *gin.Context) {
	id := c.Param("id")

	// Validate UUID format
	if _, err := uuid.Parse(id); err != nil {
		c.HTML(http.StatusNotFound, "404.html", gin.H{})
		return
	}

	var user models.User
	if err := h.db.First(&user, "id = ?", id).Error; err != nil {
		c.HTML(http.StatusNotFound, "404.html", gin.H{})
		return
	}

	page, _ := strconv.Atoi(c.DefaultQuery("page", "1"))
	limit := 30
	offset := (page - 1) * limit

	var relationships []models.Relationship
	var total int64

	h.db.Model(&models.Relationship{}).Where("follower_id = ?", user.ID).Count(&total)
	h.db.Where("follower_id = ?", user.ID).Preload("Followed").Limit(limit).Offset(offset).Find(&relationships)

	totalPages := int((total + int64(limit) - 1) / int64(limit))

	var users []models.User
	for _, rel := range relationships {
		users = append(users, rel.Followed)
	}

	c.HTML(http.StatusOK, "show_follow.html", gin.H{
		"user":        user,
		"users":       users,
		"currentPage": page,
		"totalPages":  totalPages,
		"title":       "Following",
		"followType":  "following",
	})
}

func (h *UserHandler) Followers(c *gin.Context) {
	id := c.Param("id")

	// Validate UUID format
	if _, err := uuid.Parse(id); err != nil {
		c.HTML(http.StatusNotFound, "404.html", gin.H{})
		return
	}

	var user models.User
	if err := h.db.First(&user, "id = ?", id).Error; err != nil {
		c.HTML(http.StatusNotFound, "404.html", gin.H{})
		return
	}

	page, _ := strconv.Atoi(c.DefaultQuery("page", "1"))
	limit := 30
	offset := (page - 1) * limit

	var relationships []models.Relationship
	var total int64

	h.db.Model(&models.Relationship{}).Where("followed_id = ?", user.ID).Count(&total)
	h.db.Where("followed_id = ?", user.ID).Preload("Follower").Limit(limit).Offset(offset).Find(&relationships)

	totalPages := int((total + int64(limit) - 1) / int64(limit))

	var users []models.User
	for _, rel := range relationships {
		users = append(users, rel.Follower)
	}

	c.HTML(http.StatusOK, "show_follow.html", gin.H{
		"user":        user,
		"users":       users,
		"currentPage": page,
		"totalPages":  totalPages,
		"title":       "Followers",
		"followType":  "followers",
	})
}

// API Methods

func (h *UserHandler) APIIndex(c *gin.Context) {
	page, _ := strconv.Atoi(c.DefaultQuery("page", "1"))
	limit := 30
	offset := (page - 1) * limit

	var users []models.User
	var total int64

	h.db.Model(&models.User{}).Where("activated = ?", true).Count(&total)
	h.db.Where("activated = ?", true).Limit(limit).Offset(offset).Find(&users)

	var userResponses []models.UserResponse
	for _, user := range users {
		userResponses = append(userResponses, user.ToResponse())
	}

	totalPages := int((total + int64(limit) - 1) / int64(limit))

	c.JSON(http.StatusOK, gin.H{
		"users":       userResponses,
		"currentPage": page,
		"totalPages":  totalPages,
		"total":       total,
	})
}

func (h *UserHandler) APIShow(c *gin.Context) {
	id := c.Param("id")

	// Validate UUID format
	if _, err := uuid.Parse(id); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid user ID format"})
		return
	}

	var user models.User
	if err := h.db.First(&user, "id = ?", id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "User not found"})
		return
	}

	if !user.Activated {
		c.JSON(http.StatusNotFound, gin.H{"error": "User not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"user": user.ToResponse()})
}

func (h *UserHandler) APIUpdate(c *gin.Context) {
	id := c.Param("id")
	currentUser := c.MustGet("user").(*models.User)

	// Users can only edit their own profile
	if currentUser.ID != id {
		c.JSON(http.StatusForbidden, gin.H{"error": "Access denied"})
		return
	}

	var req models.UpdateUserRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Check if email is already taken by another user
	var existingUser models.User
	if err := h.db.Where("email = ? AND id != ?", req.Email, currentUser.ID).First(&existingUser).Error; err == nil {
		c.JSON(http.StatusUnprocessableEntity, gin.H{"error": "Email has already been taken"})
		return
	}

	currentUser.Name = req.Name
	currentUser.Email = req.Email

	if req.Password != "" {
		if err := currentUser.SetPassword(req.Password); err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to update password"})
			return
		}
	}

	if err := h.db.Save(currentUser).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to update user"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"user": currentUser.ToResponse()})
}

func (h *UserHandler) APIDelete(c *gin.Context) {
	id := c.Param("id")

	// Validate UUID format
	if _, err := uuid.Parse(id); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid user ID format"})
		return
	}

	var user models.User
	if err := h.db.First(&user, "id = ?", id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "User not found"})
		return
	}

	if err := h.db.Delete(&user).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to delete user"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "User deleted successfully"})
}

func (h *UserHandler) APIFollowing(c *gin.Context) {
	id := c.Param("id")

	// Validate UUID format
	if _, err := uuid.Parse(id); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid user ID format"})
		return
	}

	var user models.User
	if err := h.db.First(&user, "id = ?", id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "User not found"})
		return
	}

	page, _ := strconv.Atoi(c.DefaultQuery("page", "1"))
	limit := 30
	offset := (page - 1) * limit

	var relationships []models.Relationship
	var total int64

	h.db.Model(&models.Relationship{}).Where("follower_id = ?", user.ID).Count(&total)
	h.db.Where("follower_id = ?", user.ID).Preload("Followed").Limit(limit).Offset(offset).Find(&relationships)

	var users []models.UserResponse
	for _, rel := range relationships {
		users = append(users, rel.Followed.ToResponse())
	}

	totalPages := int((total + int64(limit) - 1) / int64(limit))

	c.JSON(http.StatusOK, gin.H{
		"user":        user.ToResponse(),
		"users":       users,
		"currentPage": page,
		"totalPages":  totalPages,
		"total":       total,
	})
}

func (h *UserHandler) APIFollowers(c *gin.Context) {
	id := c.Param("id")

	// Validate UUID format
	if _, err := uuid.Parse(id); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid user ID format"})
		return
	}

	var user models.User
	if err := h.db.First(&user, "id = ?", id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "User not found"})
		return
	}

	page, _ := strconv.Atoi(c.DefaultQuery("page", "1"))
	limit := 30
	offset := (page - 1) * limit

	var relationships []models.Relationship
	var total int64

	h.db.Model(&models.Relationship{}).Where("followed_id = ?", user.ID).Count(&total)
	h.db.Where("followed_id = ?", user.ID).Preload("Follower").Limit(limit).Offset(offset).Find(&relationships)

	var users []models.UserResponse
	for _, rel := range relationships {
		users = append(users, rel.Follower.ToResponse())
	}

	totalPages := int((total + int64(limit) - 1) / int64(limit))

	c.JSON(http.StatusOK, gin.H{
		"user":        user.ToResponse(),
		"users":       users,
		"currentPage": page,
		"totalPages":  totalPages,
		"total":       total,
	})
}
