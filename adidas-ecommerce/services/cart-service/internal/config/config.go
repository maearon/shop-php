package config

import (
	"os"
	"strconv"
)

type Config struct {
	DatabaseURL  string
	JWTSecret    string
	SMTPHost     string
	SMTPPort     int
	SMTPUsername string
	SMTPPassword string
	AppURL       string
	Environment  string
}

func Load() *Config {
	smtpPort, _ := strconv.Atoi(getEnv("SMTP_PORT", "587"))

	return &Config{
		DatabaseURL:  getEnv("DATABASE_URL", "postgres://localhost/go_boilerplate_dev?sslmode=disable"),
		JWTSecret:    getEnv("JWT_SECRET", "6a31ee167b28ab32ab171795d2eff778"),
		SMTPHost:     getEnv("SMTP_HOST", "localhost"),
		SMTPPort:     smtpPort,
		SMTPUsername: getEnv("SMTP_USERNAME", ""),
		SMTPPassword: getEnv("SMTP_PASSWORD", ""),
		AppURL:       getEnv("APP_URL", "http://localhost:8080"),
		Environment:  getEnv("ENVIRONMENT", "development"),
	}
}

func getEnv(key, defaultValue string) string {
	if value := os.Getenv(key); value != "" {
		return value
	}
	return defaultValue
}
