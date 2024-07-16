# Etapa 1: Construcción de la aplicación
FROM node:18-alpine AS build

WORKDIR /app

COPY package*.json ./
COPY *env. ./

RUN npm install

COPY . .

# Cambia a "build" para producción
RUN npm run build

# Etapa 2: Servir la aplicación
FROM nginx:alpine

COPY --from=build /app/dist /usr/share/nginx/html

# Copia el archivo de configuración de Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expone el puerto 80
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
