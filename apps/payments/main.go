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

	// Initialize database
	var err error
	db, err = sql.Open("postgres", os.Getenv("DATABASE_URL"))
	if err != nil {
		log.Fatal("Failed to connect to database:", err)
	}
	defer db.Close()

	// Initialize RabbitMQ
	rabbitConn, err = amqp.Dial(os.Getenv("RABBITMQ_URL"))
	if err != nil {
		log.Fatal("Failed to connect to RabbitMQ:", err)
	}
	defer rabbitConn.Close()

	rabbitChannel, err = rabbitConn.Channel()
	if err != nil {
		log.Fatal("Failed to open RabbitMQ channel:", err)
	}
	defer rabbitChannel.Close()

	// Declare queues
	_, err = rabbitChannel.QueueDeclare("payment_events", true, false, false, false, nil)
	if err != nil {
		log.Fatal("Failed to declare queue:", err)
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

	// Store payment in database
	_, err = db.Exec(`
        INSERT INTO payments (id, order_id, stripe_payment_intent_id, amount, currency, status)
        VALUES ($1, $2, $3, $4, $5, $6)
    `, pi.ID, req.OrderID, pi.ID, req.Amount, req.Currency, "pending")

	if err != nil {
		log.Printf("Error storing payment: %v", err)
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

	eventType := event["type"].(string)

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
	data := event["data"].(map[string]interface{})
	object := data["object"].(map[string]interface{})
	paymentIntentID := object["id"].(string)

	_, err := db.Exec("UPDATE payments SET status = 'completed' WHERE stripe_payment_intent_id = $1", paymentIntentID)
	if err != nil {
		log.Printf("Error updating payment status: %v", err)
		return
	}

	// Publish payment success event
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

func handlePaymentFailure(event map[string]interface{}) {
	// Handle payment failure
	data := event["data"].(map[string]interface{})
	object := data["object"].(map[string]interface{})
	paymentIntentID := object["id"].(string)

	_, err := db.Exec("UPDATE payments SET status = 'failed' WHERE stripe_payment_intent_id = $1", paymentIntentID)
	if err != nil {
		log.Printf("Error updating payment status: %v", err)
		return
	}

	// Publish payment failure event
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
