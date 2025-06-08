package handlers

import (
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

type RelationshipHandler struct {
	DB *gorm.DB
}

func NewRelationshipHandler(db *gorm.DB) *RelationshipHandler {
	return &RelationshipHandler{
		DB: db,
	}
}

func (h *RelationshipHandler) Create(c *gin.Context) {
	c.JSON(200, gin.H{
		"message": "create relationship from relationship handler",
		"status":  "success",
	})
}

func (h *RelationshipHandler) Delete(c *gin.Context) {
	c.JSON(200, gin.H{
		"message": "delete relationship from relationship handler",
		"status":  "success",
	})
}

func (h *RelationshipHandler) APIIndex(c *gin.Context) {
	c.JSON(200, gin.H{
		"message": "API index relationships from relationship handler",
		"status":  "success",
		"data":    []interface{}{},
	})
}

func (h *RelationshipHandler) APICreate(c *gin.Context) {
	c.JSON(201, gin.H{
		"message": "API create relationship from relationship handler",
		"status":  "success",
	})
}

func (h *RelationshipHandler) APIDelete(c *gin.Context) {
	id := c.Param("id")
	c.JSON(200, gin.H{
		"message": "API delete relationship from relationship handler",
		"status":  "success",
		"id":      id,
	})
}
