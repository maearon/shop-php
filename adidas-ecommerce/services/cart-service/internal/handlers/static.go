package handlers

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

type StaticHandler struct{}

func NewStaticHandler() *StaticHandler {
	return &StaticHandler{}
}

func (h *StaticHandler) Home(c *gin.Context) {
	user, exists := c.Get("user")
	if exists {
		// Show feed for logged in users
		c.HTML(http.StatusOK, "home_logged_in.html", gin.H{
			"user": user,
		})
	} else {
		// Show landing page for visitors
		c.HTML(http.StatusOK, "home.html", gin.H{})
	}
}

func (h *StaticHandler) About(c *gin.Context) {
	c.HTML(http.StatusOK, "about.html", gin.H{
		"title": "About",
	})
}

func (h *StaticHandler) Help(c *gin.Context) {
	c.HTML(http.StatusOK, "help.html", gin.H{
		"title": "Help",
	})
}

func (h *StaticHandler) Contact(c *gin.Context) {
	c.HTML(http.StatusOK, "contact.html", gin.H{
		"title": "Contact",
	})
}
