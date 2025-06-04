package services

import (
	"crypto/rand"
	"encoding/hex"
	"fmt"

	"go-boilerplate/internal/config"

	"gopkg.in/gomail.v2"
)

type EmailService struct {
	config *config.Config
}

func NewEmailService(cfg *config.Config) *EmailService {
	return &EmailService{config: cfg}
}

func (e *EmailService) SendActivationEmail(email, name, token string) error {
	activationURL := fmt.Sprintf("%s/account_activations/%s/edit?email=%s", e.config.AppURL, token, email)

	subject := "Account activation"
	body := fmt.Sprintf(`
		<h1>Sample App</h1>
		<p>Hi %s,</p>
		<p>Welcome to the Sample App! Click on the link below to activate your account:</p>
		<a href="%s">Activate</a>
		<p>If you have any questions, feel free to contact us.</p>
	`, name, activationURL)

	return e.sendEmail(email, subject, body)
}

func (e *EmailService) SendPasswordResetEmail(email, name, token string) error {
	resetURL := fmt.Sprintf("%s/password_resets/%s/edit?email=%s", e.config.AppURL, token, email)

	subject := "Password reset"
	body := fmt.Sprintf(`
		<h1>Password reset</h1>
		<p>Hi %s,</p>
		<p>To reset your password click the link below:</p>
		<a href="%s">Reset password</a>
		<p>This link will expire in two hours.</p>
		<p>If you did not request your password to be reset, please ignore this email and your password will stay as it is.</p>
	`, name, resetURL)

	return e.sendEmail(email, subject, body)
}

func (e *EmailService) sendEmail(to, subject, body string) error {
	m := gomail.NewMessage()
	m.SetHeader("From", e.config.SMTPUsername)
	m.SetHeader("To", to)
	m.SetHeader("Subject", subject)
	m.SetBody("text/html", body)

	d := gomail.NewDialer(e.config.SMTPHost, e.config.SMTPPort, e.config.SMTPUsername, e.config.SMTPPassword)

	return d.DialAndSend(m)
}

func GenerateToken() (string, error) {
	bytes := make([]byte, 16)
	if _, err := rand.Read(bytes); err != nil {
		return "", err
	}
	return hex.EncodeToString(bytes), nil
}
