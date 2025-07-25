
FROM node:18-alpine AS base

WORKDIR /app

COPY package.json package-lock.json ./

FROM base AS dependencies
RUN npm install --production

FROM base AS build
COPY --from=dependencies /app/node_modules ./node_modules
COPY . .


EXPOSE 3000


CMD ["node", "src/server.js"]
