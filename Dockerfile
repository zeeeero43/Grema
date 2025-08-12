# Simplified single-stage build for reliability
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install ALL dependencies (needed because of ESBuild bundling requirements)
RUN npm ci && npm cache clean --force

# Copy source code
COPY . .

# Build the application
RUN npm run build && \
    rm -rf public && \
    mkdir -p public && \
    cp -r dist/public/* public/ && \
    find public -name "*.html" -type f -exec sed -i 's|"/Grema/|"/|g' {} \;

# Create non-root user
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodejs -u 1001

# Change ownership of the app directory
RUN chown -R nodejs:nodejs /app
USER nodejs

# Expose port
EXPOSE 5000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:5000/ || exit 1

# Set production environment
ENV NODE_ENV=production

# Start the application
CMD ["node", "dist/index.js"]