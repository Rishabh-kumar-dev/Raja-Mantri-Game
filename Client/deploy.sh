#!/bin/bash
 
echo "==============================="
echo "🚀 Starting Vite Frontend Deployment"
echo "==============================="
 
# Pull latest code
echo "📥 Pulling latest code from git..."
git pull
 
# Stop running container if exists
echo "🛑 Stopping old container (if any)..."
sudo docker stop frontend-container-2 || true
 
# Remove old container if exists
echo "🧹 Removing old container (if any)..."
sudo docker rm frontend-container-2 || true

# sudo docker system prune -a -f --volumes

# Build new docker image
echo "🐳 Building new Docker image for Vite app..."
sudo docker build -t frontend:latest-2 .
 
# Run new container
echo "🚀 Running new container..."
sudo docker run -d --name frontend-container-2 -p 3001:3001 frontend:latest-2
 
echo "=================================="
echo "🎉 Deployment Completed Successfully"
echo "✅ App Running At: http://your-server-ip:3000"
echo "=================================="