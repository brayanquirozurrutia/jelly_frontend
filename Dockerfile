# Etapa 1: Construcción de la aplicación
FROM node:18-alpine AS build

# Establecer el directorio de trabajo
WORKDIR /app

# Copiar package.json y package-lock.json
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Copiar el resto del código de la aplicación
COPY . .

# Exponer el puerto en el que Vite correrá
EXPOSE 3000

# Comando por defecto para ejecutar Vite
CMD ["npm", "run", "dev"]
