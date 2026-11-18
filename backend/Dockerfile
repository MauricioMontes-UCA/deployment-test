FROM node:22-alpine

ENV NODE_ENV=production

WORKDIR /app

# /app/package.json, /app/package-lock.json
COPY package.json package-lock.json ./
RUN npm i

# /app/src/*, # /app/scripts/*
COPY src ./src
COPY scripts ./scripts

USER node

EXPOSE 3000

CMD ["node", "src/server.js"]