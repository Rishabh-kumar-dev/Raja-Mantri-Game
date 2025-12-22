# Use an official Node.js runtime as a base image
FROM node:22-alpine
 
# Set the working directory inside the container
WORKDIR /usr/src/app
 
# Copy package.json and package-lock.json to install deps
COPY package*.json ./
 
# Install dependencies
RUN npm install
 
# Copy the rest of the app's source code
COPY . .
 
# Build the Vite app (output goes to /dist)
RUN npm run build
 
# Install a static server to serve the built files
RUN npm install -g serve
 
# Expose port 3000
EXPOSE 3001
 
# Use serve to serve the Vite app's dist folder
CMD ["serve", "-s", "dist", "-l", "3001"]

