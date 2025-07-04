import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

async function main() {
  console.log("🌱 Seeding database...")

  // Create sample users
  const user1 = await prisma.user.upsert({
    where: { id: "user1" },
    update: {},
    create: {
      id: "user1",
      username: "Alice",
      email: "alice@example.com",
    },
  })

  const user2 = await prisma.user.upsert({
    where: { id: "user2" },
    update: {},
    create: {
      id: "user2",
      username: "Bob",
      email: "bob@example.com",
    },
  })

  // Create sample room
  const room = await prisma.room.upsert({
    where: { id: "general" },
    update: {},
    create: {
      id: "general",
      name: "General Chat",
      createdBy: user1.id,
    },
  })

  // Create sample messages
  await prisma.message.createMany({
    data: [
      {
        content: "Hello everyone! 👋",
        roomId: room.id,
        userId: user1.id,
        type: "TEXT",
      },
      {
        content: "Hi Alice! How are you doing?",
        roomId: room.id,
        userId: user2.id,
        type: "TEXT",
      },
      {
        content: "I'm doing great! Thanks for asking 😊",
        roomId: room.id,
        userId: user1.id,
        type: "TEXT",
      },
    ],
  })

  console.log("✅ Database seeded successfully!")
}

main()
  .catch((e) => {
    console.error("❌ Error seeding database:", e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
