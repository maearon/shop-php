package main

import (
	"database/sql"
	"encoding/json"
	"log"
	"os"

	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
	_ "github.com/lib/pq"
	"github.com/streadway/amqp"
	"github.com/stripe/stripe-go/v76"
	"github.com/stripe/stripe-go/v76/paymentintent"
)

type PaymentRequest struct {
	OrderID  string `json:"order_id"`
	Amount   int64  `json:"amount"`
	Currency string `json:"currency"`
}

type PaymentResponse struct {
	ClientSecret string `json:"client_secret"`
	PaymentID    string `json:"payment_id"`
}

var db *sql.DB
var rabbitConn *amqp.Connection
var rabbitChannel *amqp.Channel

func main() {
	// Load environment variables
	if err := godotenv.Load(); err != nil {
		log.Println("No .env file found")
	}

	// Initialize Stripe
	stripe.Key = os.Getenv("STRIPE_SECRET_KEY")
	if stripe.Key == "" {
		stripe.Key = "sk_test_dummy_key" // fallback for development
	}

	// Initialize database
	var err error
	dbURL := os.Getenv("DATABASE_URL")
	if dbURL == "" {
		dbURL = "postgres://localhost/adidas_ecommerce?sslmode=disable"
	}

	db, err = sql.Open("postgres", dbURL)
	if err != nil {
		log.Printf("Failed to connect to database: %v", err)
		// Don't exit, continue without database for now
	} else {
		defer db.Close()
		if err := db.Ping(); err != nil {
			log.Printf("Database ping failed: %v", err)
		} else {
			log.Println("Database connected successfully")
		}
	}

	// Initialize RabbitMQ
	rabbitURL := os.Getenv("RABBITMQ_URL")
	if rabbitURL == "" {
		rabbitURL = "amqp://guest:guest@localhost:5672"
	}

	rabbitConn, err = amqp.Dial(rabbitURL)
	if err != nil {
		log.Printf("Failed to connect to RabbitMQ: %v", err)
		// Don't exit, continue without RabbitMQ for now
	} else {
		defer rabbitConn.Close()

		rabbitChannel, err = rabbitConn.Channel()
		if err != nil {
			log.Printf("Failed to open RabbitMQ channel: %v", err)
		} else {
			defer rabbitChannel.Close()

			// Declare queues
			_, err = rabbitChannel.QueueDeclare("payment_events", true, false, false, false, nil)
			if err != nil {
				log.Printf("Failed to declare queue: %v", err)
			} else {
				log.Println("RabbitMQ connected successfully")
			}
		}
	}

	// Initialize Gin router
	r := gin.Default()

	// Middleware
	r.Use(func(c *gin.Context) {
		c.Header("Access-Control-Allow-Origin", "*")
		c.Header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
		c.Header("Access-Control-Allow-Headers", "Content-Type, Authorization")

		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(204)
			return
		}

		c.Next()
	})

	// Routes
	r.GET("/health", func(c *gin.Context) {
		c.JSON(200, gin.H{"status": "healthy", "service": "payments"})
	})

	r.POST("/payments/create-intent", createPaymentIntent)
	r.POST("/payments/webhook", handleStripeWebhook)

	port := os.Getenv("PORT")
	if port == "" {
		port = "3003"
	}

	log.Printf("Payments service running on port %s", port)
	r.Run(":" + port)
}

func createPaymentIntent(c *gin.Context) {
	var req PaymentRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(400, gin.H{"error": err.Error()})
		return
	}

	// Default currency if not provided
	if req.Currency == "" {
		req.Currency = "vnd"
	}

	params := &stripe.PaymentIntentParams{
		Amount:   stripe.Int64(req.Amount),
		Currency: stripe.String(req.Currency),
		Metadata: map[string]string{
			"order_id": req.OrderID,
		},
	}

	pi, err := paymentintent.New(params)
	if err != nil {
		log.Printf("Error creating payment intent: %v", err)
		c.JSON(500, gin.H{"error": "Failed to create payment intent"})
		return
	}

	// Store payment in database if available
	if db != nil {
		_, err = db.Exec(`
			INSERT INTO payments (id, order_id, stripe_payment_intent_id, amount, currency, status, created_at, updated_at)
			VALUES ($1, $2, $3, $4, $5, $6, NOW(), NOW())
		`, pi.ID, req.OrderID, pi.ID, float64(req.Amount)/100, req.Currency, "pending")

		if err != nil {
			log.Printf("Error storing payment: %v", err)
		}
	}

	c.JSON(200, PaymentResponse{
		ClientSecret: pi.ClientSecret,
		PaymentID:    pi.ID,
	})
}

func handleStripeWebhook(c *gin.Context) {
	// Handle Stripe webhooks for payment status updates
	body, err := c.GetRawData()
	if err != nil {
		c.JSON(400, gin.H{"error": "Invalid request body"})
		return
	}

	// Verify webhook signature (simplified for demo)
	// In production, you should verify the webhook signature

	var event map[string]interface{}
	if err := json.Unmarshal(body, &event); err != nil {
		c.JSON(400, gin.H{"error": "Invalid JSON"})
		return
	}

	eventType, ok := event["type"].(string)
	if !ok {
		c.JSON(400, gin.H{"error": "Invalid event type"})
		return
	}

	switch eventType {
	case "payment_intent.succeeded":
		handlePaymentSuccess(event)
	case "payment_intent.payment_failed":
		handlePaymentFailure(event)
	}

	c.JSON(200, gin.H{"received": true})
}

func handlePaymentSuccess(event map[string]interface{}) {
	// Update payment status and publish event
	data, ok := event["data"].(map[string]interface{})
	if !ok {
		log.Println("Invalid event data")
		return
	}

	object, ok := data["object"].(map[string]interface{})
	if !ok {
		log.Println("Invalid event object")
		return
	}

	paymentIntentID, ok := object["id"].(string)
	if !ok {
		log.Println("Invalid payment intent ID")
		return
	}

	// Update database if available
	if db != nil {
		_, err := db.Exec("UPDATE payments SET status = 'completed', updated_at = NOW() WHERE stripe_payment_intent_id = $1", paymentIntentID)
		if err != nil {
			log.Printf("Error updating payment status: %v", err)
			return
		}
	}

	// Publish payment success event if RabbitMQ is available
	if rabbitChannel != nil {
		eventData := map[string]interface{}{
			"event":             "payment_completed",
			"payment_intent_id": paymentIntentID,
		}

		eventJSON, _ := json.Marshal(eventData)
		rabbitChannel.Publish("", "payment_events", false, false, amqp.Publishing{
			ContentType: "application/json",
			Body:        eventJSON,
		})
	}
}

func handlePaymentFailure(event map[string]interface{}) {
	// Handle payment failure
	data, ok := event["data"].(map[string]interface{})
	if !ok {
		log.Println("Invalid event data")
		return
	}

	object, ok := data["object"].(map[string]interface{})
	if !ok {
		log.Println("Invalid event object")
		return
	}

	paymentIntentID, ok := object["id"].(string)
	if !ok {
		log.Println("Invalid payment intent ID")
		return
	}

	// Update database if available
	if db != nil {
		_, err := db.Exec("UPDATE payments SET status = 'failed', updated_at = NOW() WHERE stripe_payment_intent_id = $1", paymentIntentID)
		if err != nil {
			log.Printf("Error updating payment status: %v", err)
			return
		}
	}

	// Publish payment failure event if RabbitMQ is available
	if rabbitChannel != nil {
		eventData := map[string]interface{}{
			"event":             "payment_failed",
			"payment_intent_id": paymentIntentID,
		}

		eventJSON, _ := json.Marshal(eventData)
		rabbitChannel.Publish("", "payment_events", false, false, amqp.Publishing{
			ContentType: "application/json",
			Body:        eventJSON,
		})
	}
}
