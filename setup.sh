#!/bin/bash

echo "🚀 Setting up Adidas E-commerce Monorepo..."

# Install shared dependencies
echo "📦 Installing shared dependencies..."
cd libs/shared
npm install
echo "✅ Shared dependencies installed"

# Generate Prisma client
echo "🔧 Generating Prisma client..."
npm run db:generate
echo "✅ Prisma client generated"

# Push schema to database
echo "📊 Pushing schema to database..."
npm run db:push
echo "✅ Schema pushed to database"

# Seed database
echo "🌱 Seeding database..."
npm run db:seed
echo "✅ Database seeded"

cd ../..

# Install web app dependencies
echo "📦 Installing web app dependencies..."
cd apps/web
npm install
echo "✅ Web app dependencies installed"

cd ../..

echo "🎉 Setup complete! You can now run 'npm run dev' to start the services."
