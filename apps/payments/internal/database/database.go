package database

import (
	"go-boilerplate/internal/models"
	"os"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
	"gorm.io/gorm/logger"
)

func Initialize(databaseURL string) (*gorm.DB, error) {
	db, err := gorm.Open(postgres.Open(databaseURL), &gorm.Config{
		Logger: logger.Default.LogMode(logger.Info),
	})
	if err != nil {
		return nil, err
	}

	// Optional migration
	if os.Getenv("ENABLE_MIGRATION") == "true" {
		err = db.AutoMigrate(
			&models.User{},
			&models.Micropost{},
			&models.Relationship{},
		)
		if err != nil {
			return nil, err
		}
	}

	return db, nil
}
