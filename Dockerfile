FROM node:20.19-alpine AS builder
WORKDIR /app
COPY ./package*.json ./
RUN npm install
COPY . .
RUN npx prisma generate
RUN npm run build
CMD ["node", "index.js"]

FROM node:20.19-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install --omit=dev
COPY --from=builder /app/dist ./dist
COPY prisma ./prisma
EXPOSE 3000
CMD ["node", "dist/index.js"]