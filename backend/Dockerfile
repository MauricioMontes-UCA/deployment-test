FROM node:22-alpine

ENV NODE_ENV=production

WORKDIR /app

# Install dependencies first to take advantage of layer caching
COPY package.json package-lock.json ./
RUN npm ci --omit=dev && npm cache clean --force

COPY src ./src
COPY scripts ./scripts
COPY database ./database

# Run as the unprivileged user provided by the node image
USER node

EXPOSE 3000

CMD ["node", "src/server.js"]
