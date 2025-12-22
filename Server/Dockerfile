# Step 1: Use official Node.js image as the base image
FROM node:16

# Step 2: Set the working directory inside the container
WORKDIR /app

# Step 3: Copy package.json and package-lock.json (or yarn.lock) to install dependencies
COPY package*.json ./

# Step 4: Install dependencies
RUN npm install

# Step 5: Copy the rest of the application code
COPY . .

# Step 6: Expose the port that the app will run on (port 8001)
EXPOSE 8001

# Step 7: Command to run the application (update this to point to your actual entry file)
CMD ["node", "Server.js"]
