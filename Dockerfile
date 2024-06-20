FROM node:18-alpine AS builder
WORKDIR /frontend

COPY package* ./
RUN npm ci \
 && npm i -g vite

ENV API_URL=/

COPY . .
RUN vite build


FROM node:18-alpine
LABEL authors="skiyman"
EXPOSE 3000

RUN npm i -g serve

COPY --from=builder /frontend/dist/ ./dist/

CMD ["serve", "-s", "dist", "-p", "3000"]
