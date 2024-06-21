# Etapa 1: Construcción de la aplicación
FROM node:18-alpine AS build

WORKDIR /app

COPY package*.json ./
COPY *env ./

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "run", "dev"]
