FROM node:18-alpine
LABEL authors="skiyman"

WORKDIR /frontend

EXPOSE 3000

COPY package.json package-lock.json ./

RUN npm install
RUN npm install serve -g
RUN npm install vite -g
COPY . .
RUN vite build



CMD ["serve", "-s", "dist", "-p", "3000"]
