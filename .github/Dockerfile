# ──────────────────────────────────────────
# Stage 1: Build
# ──────────────────────────────────────────
FROM node:20-alpine AS builder

WORKDIR /app

# Copy dependency files first (layer caching)
COPY package*.json ./

# Install production dependencies only
RUN npm ci --only=production

# ──────────────────────────────────────────
# Stage 2: Production image
# ──────────────────────────────────────────
FROM node:20-alpine

# Add metadata labels
LABEL maintainer="your-dockerhub-username"
LABEL version="1.0.0"
LABEL description="Home Service System - Hostname Reporter"

# Create non-root user for security
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

WORKDIR /app

# Copy installed modules from builder
COPY --from=builder /app/node_modules ./node_modules

# Copy application source
COPY app.js .
COPY package.json .

# Set ownership to non-root user
RUN chown -R appuser:appgroup /app

USER appuser

# Expose the app port
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3 \
  CMD wget -qO- http://localhost:3000/health || exit 1

# Start the application
CMD ["node", "app.js"]
