FROM node:bullseye AS builder

WORKDIR /app
COPY package.json bun.lock ./

RUN npm install --frozen-lockfile

COPY . .

RUN npx prisma generate
RUN npm run build

FROM node:bullseye AS runner

WORKDIR /app

# Copy only necessary files from the builder stage
COPY --from=builder /app/package.json /app/bun.lock ./
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/public ./public
COPY --from=builder /app/prisma ./prisma

EXPOSE 3000

# Start the application
CMD ["npm", "run", "start"]
