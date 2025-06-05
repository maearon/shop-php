package handlers

import (
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

type MicropostHandler struct {
	DB *gorm.DB
}

func NewMicropostHandler(db *gorm.DB) *MicropostHandler {
	return &MicropostHandler{
		DB: db,
	}
}

func (h *MicropostHandler) Create(c *gin.Context) {
	c.JSON(200, gin.H{
		"message": "create micropost from micropost handler",
		"status":  "success",
	})
}

func (h *MicropostHandler) Delete(c *gin.Context) {
	c.JSON(200, gin.H{
		"message": "delete micropost from micropost handler",
		"status":  "success",
	})
}

func (h *MicropostHandler) APIIndex(c *gin.Context) {
	c.JSON(200, gin.H{
		"message": "list microposts from micropost handler",
		"status":  "success",
	})
}

func (h *MicropostHandler) APICreate(c *gin.Context) {
	c.JSON(201, gin.H{
		"message": "API create micropost from micropost handler",
		"status":  "success",
	})
}

func (h *MicropostHandler) APIShow(c *gin.Context) {
	id := c.Param("id")
	c.JSON(200, gin.H{
		"message": "API show micropost from micropost handler",
		"status":  "success",
		"id":      id,
	})
}

func (h *MicropostHandler) APIUpdate(c *gin.Context) {
	id := c.Param("id")
	c.JSON(200, gin.H{
		"message": "API update micropost from micropost handler",
		"status":  "success",
		"id":      id,
	})
}

func (h *MicropostHandler) APIDelete(c *gin.Context) {
	id := c.Param("id")
	c.JSON(200, gin.H{
		"message": "API delete micropost from micropost handler",
		"status":  "success",
		"id":      id,
	})
}
