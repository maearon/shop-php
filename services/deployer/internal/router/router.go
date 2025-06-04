package router

import (
	"go-boilerplate/internal/config"
	"go-boilerplate/internal/handlers"
	"go-boilerplate/internal/middleware"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func Setup(db *gorm.DB, cfg *config.Config) *gin.Engine {
	if cfg.Environment == "production" {
		gin.SetMode(gin.ReleaseMode)
	}

	r := gin.Default()

	// Load HTML templates
	// r.LoadHTMLGlob("templates/*")
	r.LoadHTMLGlob("templates/**/*")
	r.Static("/static", "./static")

	// Initialize handlers
	staticHandler := handlers.NewStaticHandler()
	userHandler := handlers.NewUserHandler(db, cfg)
	authHandler := handlers.NewAuthHandler(db, cfg)
	micropostHandler := handlers.NewMicropostHandler(db)
	relationshipHandler := handlers.NewRelationshipHandler(db)

	// Middleware
	authMiddleware := middleware.AuthMiddleware(db, cfg.JWTSecret)
	optionalAuthMiddleware := middleware.OptionalAuthMiddleware(db, cfg.JWTSecret)
	adminMiddleware := middleware.AdminMiddleware()

	// Static pages
	r.GET("/", optionalAuthMiddleware, staticHandler.Home)
	r.GET("/about", staticHandler.About)
	r.GET("/help", staticHandler.Help)
	r.GET("/contact", staticHandler.Contact)

	// Authentication routes
	r.GET("/signup", authHandler.SignupForm)
	r.POST("/signup", authHandler.Signup)
	r.GET("/login", authHandler.LoginForm)
	r.POST("/login", authHandler.Login)
	r.POST("/logout", authHandler.Logout)

	// Account activation
	r.GET("/account_activations/:token/edit", authHandler.ActivateAccount)

	// Password reset
	r.GET("/password_resets/new", authHandler.PasswordResetForm)
	r.POST("/password_resets", authHandler.CreatePasswordReset)
	r.GET("/password_resets/:token/edit", authHandler.EditPasswordReset)
	r.PATCH("/password_resets/:token", authHandler.UpdatePasswordReset)

	// User routes
	r.GET("/users", optionalAuthMiddleware, userHandler.Index)
	r.GET("/users/:id", optionalAuthMiddleware, userHandler.Show)
	r.GET("/users/:id/edit", authMiddleware, userHandler.EditForm)
	r.PATCH("/users/:id", authMiddleware, userHandler.Update)
	r.DELETE("/users/:id", authMiddleware, adminMiddleware, userHandler.Delete)

	// Following/followers
	r.GET("/users/:id/following", optionalAuthMiddleware, userHandler.Following)
	r.GET("/users/:id/followers", optionalAuthMiddleware, userHandler.Followers)

	// Micropost routes
	r.POST("/microposts", authMiddleware, micropostHandler.Create)
	r.DELETE("/microposts/:id", authMiddleware, micropostHandler.Delete)

	// Relationship routes
	r.POST("/relationships", authMiddleware, relationshipHandler.Create)
	r.DELETE("/relationships/:id", authMiddleware, relationshipHandler.Delete)

	// API routes
	api := r.Group("/api/v1")
	{
		// Authentication API
		api.POST("/signup", authHandler.APISignup)
		api.POST("/login", authHandler.APILogin)
		api.POST("/logout", authMiddleware, authHandler.APILogout)

		// User API
		api.GET("/users", optionalAuthMiddleware, userHandler.APIIndex)
		api.GET("/users/:id", optionalAuthMiddleware, userHandler.APIShow)
		api.PATCH("/users/:id", authMiddleware, userHandler.APIUpdate)
		api.DELETE("/users/:id", authMiddleware, adminMiddleware, userHandler.APIDelete)

		// Micropost API
		api.GET("/microposts", optionalAuthMiddleware, micropostHandler.APIIndex)
		api.POST("/microposts", authMiddleware, micropostHandler.APICreate)
		api.GET("/microposts/:id", optionalAuthMiddleware, micropostHandler.APIShow)
		api.PATCH("/microposts/:id", authMiddleware, micropostHandler.APIUpdate)
		api.DELETE("/microposts/:id", authMiddleware, micropostHandler.APIDelete)

		// Relationship API
		api.GET("/relationships", authMiddleware, relationshipHandler.APIIndex)
		api.POST("/relationships", authMiddleware, relationshipHandler.APICreate)
		api.DELETE("/relationships/:id", authMiddleware, relationshipHandler.APIDelete)

		// Following/followers API
		api.GET("/users/:id/following", optionalAuthMiddleware, userHandler.APIFollowing)
		api.GET("/users/:id/followers", optionalAuthMiddleware, userHandler.APIFollowers)
	}

	return r
}
