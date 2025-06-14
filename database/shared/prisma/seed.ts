import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

async function main() {
  console.log("🌱 Seeding database...")

  try {
    // Create sample products
    const products = await Promise.all([
      prisma.product.upsert({
        where: { id: "prod_ultraboost22" },
        update: {},
        create: {
          id: "prod_ultraboost22",
          name: "Ultraboost 22",
          brand: "adidas",
          category: "Running",
          sport: "running",
          gender: "unisex",
          description_h5: "Premium running shoes with Boost technology",
          description_p:
            "Experience the ultimate in comfort and performance with Ultraboost 22. Featuring responsive Boost midsole and Primeknit upper.",
          variants: {
            create: [
              {
                color: "Core Black",
                size: "42",
                price: 4200000,
                originalprice: 4500000,
                sku: "UB22-BLK-42",
                stock: 50,
              },
              {
                color: "Cloud White",
                size: "42",
                price: 4200000,
                sku: "UB22-WHT-42",
                stock: 30,
              },
            ],
          },
        },
      }),
      prisma.product.upsert({
        where: { id: "prod_stansmith" },
        update: {},
        create: {
          id: "prod_stansmith",
          name: "Stan Smith",
          brand: "adidas",
          category: "Originals",
          sport: "lifestyle",
          gender: "unisex",
          description_h5: "Classic white leather sneakers",
          description_p:
            "The iconic Stan Smith sneaker. Clean, classic, and timeless design that goes with everything.",
          variants: {
            create: [
              {
                color: "White/Green",
                size: "42",
                price: 2500000,
                sku: "SS-WHTGRN-42",
                stock: 100,
              },
            ],
          },
        },
      }),
      prisma.product.upsert({
        where: { id: "prod_superstar" },
        update: {},
        create: {
          id: "prod_superstar",
          name: "Superstar",
          brand: "adidas",
          category: "Originals",
          sport: "lifestyle",
          gender: "unisex",
          description_h5: "Iconic shell-toe sneakers",
          description_p: "The legendary Superstar with its distinctive shell toe and three stripes.",
          variants: {
            create: [
              {
                color: "White/Black",
                size: "42",
                price: 2800000,
                sku: "SS-WHTBLK-42",
                stock: 75,
              },
            ],
          },
        },
      }),
    ])

    // Create sample user
    const user = await prisma.user.upsert({
      where: { email: "demo@adidas.com" },
      update: {},
      create: {
        username: "demo_user",
        displayName: "Demo User",
        email: "demo@adidas.com",
        activated: true,
      },
    })

    console.log("✅ Database seeded successfully!")
    console.log(`Created ${products.length} products`)
    console.log(`Created user: ${user.email}`)
  } catch (error) {
    console.error("❌ Error seeding database:", error)
  }
}

main()
  .catch((e) => {
    console.error("❌ Error seeding database:", e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
