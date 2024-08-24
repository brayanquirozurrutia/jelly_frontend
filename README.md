# Proyecto Frontend con React, Vite, TypeScript y Tailwind CSS

Este es un proyecto de frontend desarrollado con React, utilizando Vite como herramienta de construcción, TypeScript para el tipado estático y Tailwind CSS para los estilos.

## Estructura del Proyecto

El proyecto está estructurado de la siguiente manera:

```plaintext
.
├── public/
├── src
│   ├── components/
│   │   └── Hello.tsx
│   ├── graphql/
│   ├── hooks/
│   ├── layouts/
│   ├── services/
│   ├── utils/
│   ├── App.css
│   ├── App.tsx
│   ├── index.css
│   ├── main.tsx
│   ├── tailwind.css
│   ├── theme.ts
│   ├── types.ts
│   └── vite-env.d.ts
├── .dockerignore
├── .env
├── .eslintrc.js
├── .gitignore
├── apolloClient.ts
├── axiosInstance.ts
├── docker-compose.yml
├── Dockerfile
├── index.html
├── nginx.conf
├── package.json
├── package-lock.json
├── postcss.config.js
├── README.md
├── tailwind.config.js
├── tsconfig.json
├── tsconfig.node.json
└── vite.config.ts
```

## Prerequisitos

Para poder ejecutar el proyecto, es necesario tener instalado Node.js y npm.

Si usas Docker, también necesitarás tener instalado Docker y Docker Compose.

## Scripts

### `npm install`

Instala las dependencias del proyecto.

### `npm run dev`

Inicia el servidor de desarrollo.

### `npm run build`

Construye la aplicación para producción.

### `npm run serve`

Inicia un servidor local para previsualizar la aplicación construida.

## Levantar con Docker

Para levantar la aplicación con Docker, ejecutar los siguientes comandos:

```bash
docker-compose build

docker-compose up
```

La aplicación estará disponible en [http://localhost:3000](http://localhost:3000).
