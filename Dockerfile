FROM oven/bun:latest AS builder

WORKDIR /app
COPY package.json bun.lock ./

RUN bun install --frozen-lockfile

COPY . .

RUN bun run build

FROM oven/bun:latest AS runner

WORKDIR /app

# Copy only necessary files from the builder stage
COPY --from=builder /app/package.json /app/bun.lock ./
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/public ./public
COPY --from=builder /app/prisma ./prisma

RUN bunx prisma generate

EXPOSE 3000

# Start the application
CMD ["bun", "run", "start"]
