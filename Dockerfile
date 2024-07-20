FROM node:18 AS build

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

FROM nginx:alpine

COPY --from=build /app/dist /usr/share/nginx/html

COPY nginx.conf /etc/nginx/nginx.conf
COPY default.conf /etc/nginx/conf.d/default.conf

COPY /etc/letsencrypt/live/tecitostore.com/fullchain.pem /etc/letsencrypt/live/tecitostore.com/fullchain.pem
COPY /etc/letsencrypt/live/tecitostore.com/privkey.pem /etc/letsencrypt/live/tecitostore.com/privkey.pem
COPY /etc/letsencrypt/options-ssl-nginx.conf /etc/letsencrypt/options-ssl-nginx.conf
COPY /etc/letsencrypt/ssl-dhparams.pem /etc/letsencrypt/ssl-dhparams.pem

EXPOSE 80
EXPOSE 443

CMD ["nginx", "-g", "daemon off;"]
