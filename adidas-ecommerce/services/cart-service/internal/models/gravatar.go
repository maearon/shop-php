package models

import (
	"crypto/md5"
	"fmt"
	"strings"
)

func GenerateGravatarURL(email string) string {
	email = strings.ToLower(strings.TrimSpace(email))
	hash := md5.Sum([]byte(email))
	return fmt.Sprintf("https://www.gravatar.com/avatar/%x?d=identicon&s=80", hash)
}
