FROM node:18-alpine AS build

WORKDIR /app

COPY package*.json ./
COPY .env.production ./

RUN npm install

COPY . .

RUN npm run build && ls -la build  # Añade esto para verificar

FROM nginx:alpine

COPY --from=build /app/build /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
