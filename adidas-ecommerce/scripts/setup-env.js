const fs = require("fs")
const path = require("path")

console.log("🚀 Setting up Adidas E-commerce Platform...")

// Create necessary directories
const directories = [
  "services/auth-service/src/main/java/com/adidas/auth",
  "services/order-service/Controllers",
  "services/product-service/src",
  "services/cart-service/cmd",
  "services/payment-service/app",
  "services/image-service/app",
  "frontend/frontstore/src/app",
  "frontend/admindashboard/src/app",
  "gateway/conf",
  "gateway/lua",
  "docker",
  "scripts",
]

directories.forEach((dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true })
    console.log(`✅ Created directory: ${dir}`)
  }
})

// Copy environment file if it doesn't exist
const envExample = ".env.example"
const envFile = ".env"

if (!fs.existsSync(envFile) && fs.existsSync(envExample)) {
  fs.copyFileSync(envExample, envFile)
  console.log("✅ Created .env file from .env.example")
}

console.log("🎉 Setup completed successfully!")
console.log("")
console.log("Next steps:")
console.log("1. Run: npm run setup:dev")
console.log("2. Run: npm run dev")
console.log("3. Access:")
console.log("   - Frontstore: http://localhost:3000")
console.log("   - Admin: http://localhost:3001")
console.log("   - API Gateway: http://localhost:8080")
