FROM mirror.gcr.io/library/node:22-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install

# Build Frontend
COPY client/ ./client/
WORKDIR /app/client
RUN npm install
RUN npm run build

# Setup Backend
WORKDIR /app/server
COPY server/ ./
RUN npm install

FROM mirror.gcr.io/library/node:22-alpine
WORKDIR /app

# Copy backend and node_modules
COPY --from=builder /app/server ./server
COPY --from=builder /app/node_modules ./node_modules

# Copy built frontend to server's public or build directory
COPY --from=builder /app/client/build ./server/client/build

WORKDIR /app/server
RUN npm prune --production

ENV NODE_ENV=production
ENV PORT=5000
ENV HOSTNAME=0.0.0.0
EXPOSE 5000

CMD ["npm", "start"]