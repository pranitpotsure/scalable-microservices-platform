# ---------------------------
# Auth Service Dockerfile
# ---------------------------

# Base image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy rest of the code
COPY . .

# Expose port
EXPOSE 4000

# Start app
CMD ["npm", "start"]
