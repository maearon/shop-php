const express = require("express")
const cors = require("cors")
const helmet = require("helmet")
const { Pool } = require("pg")
const amqp = require("amqplib")
const Redis = require("redis")
const { v4: uuidv4 } = require("uuid")
require("dotenv").config()

const app = express()
const PORT = process.env.PORT || 3002

// Database connection
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
})

// Redis connection
const redis = Redis.createClient({
  url: process.env.REDIS_URL,
})
redis.connect()

// RabbitMQ connection
let channel
async function connectRabbitMQ() {
  try {
    const connection = await amqp.connect(process.env.RABBITMQ_URL)
    channel = await connection.createChannel()

    await channel.assertQueue("order_events", { durable: true })
    await channel.assertQueue("payment_events", { durable: true })

    console.log("Connected to RabbitMQ")
  } catch (error) {
    console.error("RabbitMQ connection error:", error)
  }
}
connectRabbitMQ()

// Middleware
app.use(helmet())
app.use(cors())
app.use(express.json())

// Routes
app.get("/health", (req, res) => {
  res.json({ status: "healthy", service: "orders" })
})

app.post("/orders", async (req, res) => {
  try {
    const { user_id, items, total_amount } = req.body
    const order_id = uuidv4()

    // Start transaction
    const client = await pool.connect()

    try {
      await client.query("BEGIN")

      // Create order
      const orderResult = await client.query(
        "INSERT INTO orders (id, user_id, total_amount, status) VALUES ($1, $2, $3, $4) RETURNING *",
        [order_id, user_id, total_amount, "pending"],
      )

      // Create order items
      for (const item of items) {
        await client.query("INSERT INTO order_items (order_id, product_id, quantity, price) VALUES ($1, $2, $3, $4)", [
          order_id,
          item.product_id,
          item.quantity,
          item.price,
        ])
      }

      await client.query("COMMIT")

      const order = orderResult.rows[0]

      // Publish order created event
      if (channel) {
        await channel.sendToQueue(
          "order_events",
          Buffer.from(
            JSON.stringify({
              event: "order_created",
              order_id,
              user_id,
              total_amount,
              items,
            }),
          ),
        )
      }

      res.status(201).json(order)
    } catch (error) {
      await client.query("ROLLBACK")
      throw error
    } finally {
      client.release()
    }
  } catch (error) {
    console.error("Error creating order:", error)
    res.status(500).json({ error: "Internal server error" })
  }
})

app.get("/orders/:id", async (req, res) => {
  try {
    const { id } = req.params

    const result = await pool.query(
      `
      SELECT o.*, 
             json_agg(
               json_build_object(
                 'product_id', oi.product_id,
                 'quantity', oi.quantity,
                 'price', oi.price
               )
             ) as items
      FROM orders o
      LEFT JOIN order_items oi ON o.id = oi.order_id
      WHERE o.id = $1
      GROUP BY o.id
    `,
      [id],
    )

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Order not found" })
    }

    res.json(result.rows[0])
  } catch (error) {
    console.error("Error fetching order:", error)
    res.status(500).json({ error: "Internal server error" })
  }
})

app.listen(PORT, () => {
  console.log(`Orders service running on port ${PORT}`)
})

module.exports = app
