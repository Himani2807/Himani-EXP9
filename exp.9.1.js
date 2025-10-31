# ===== 1st Stage — Build React App =====
FROM node:18 AS build

# Set working directory
WORKDIR /app

# Copy dependencies info & install
COPY package*.json ./
RUN npm install

# Copy source code
COPY . .

# Build optimized production files
RUN npm run build


# ===== 2nd Stage — Serve using NGINX =====
FROM nginx:1.25

# Copy build output to NGINX public folder
COPY --from=build /app/build /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start NGINX server
CMD ["nginx", "-g", "daemon off;"]
