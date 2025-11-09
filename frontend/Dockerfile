FROM node:16-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Configure npm for better network reliability
RUN npm config set registry https://registry.npmjs.org/ && \
    npm config set timeout 60000 && \
    npm config set retry 5 && \
    npm config set fetch-retry-mintimeout 15000 && \
    npm config set fetch-retry-maxtimeout 60000

# Install dependencies with fallback
RUN npm ci --prefer-offline --no-audit || \
    (echo "npm ci failed, trying npm install" && npm install --prefer-offline --no-audit)

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Install serve to serve static files
RUN npm install -g serve

# Expose port
EXPOSE 3000

# Serve the built application (Vite outputs to dist directory)
CMD ["serve", "-s", "dist", "-l", "3000"]