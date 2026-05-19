FROM node:20-alpine
WORKDIR /app

RUN apk add --no-cache libc6-compat

COPY package.json package-lock.json ./
RUN npm ci

COPY . .

# Build con base de datos temporal para la generación de páginas estáticas
ENV DATABASE_URL="file:/tmp/build.db"
RUN npx prisma db push && npm run build

EXPOSE 3000
ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

COPY entrypoint.sh ./
RUN chmod +x entrypoint.sh

CMD ["sh", "./entrypoint.sh"]
