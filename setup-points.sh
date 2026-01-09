#!/bin/bash

# Points System Setup Script
# This script will set up the points system database and migrations

echo "🚀 Setting up Points System..."

# Navigate to backend directory
cd backend

# Install dependencies if needed
echo "📦 Installing dependencies..."
npm install

# Run Prisma migration
echo "🗄️  Running database migration..."
npx prisma migrate dev --name add_points_system

# Generate Prisma client
echo "🔄 Generating Prisma client..."
npx prisma generate

# Build the backend
echo "🔨 Building backend..."
npm run build

echo "✅ Points system setup complete!"
echo ""
echo "Next steps:"
echo "1. Start the backend: npm run start:dev"
echo "2. In a new terminal, start the frontend: npm run dev"
echo "3. Navigate to the Dashboard to see real-time points updates"
echo ""
echo "📚 For more information, see POINTS_SYSTEM.md"
