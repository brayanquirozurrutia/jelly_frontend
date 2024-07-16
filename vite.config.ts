import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const isProduction = mode === 'production';

  return {
    plugins: [react()],
    server: {
      port: 3000, // Este puerto solo es para desarrollo
      ...(isProduction ? {} : {
        host: '0.0.0.0', // Para desarrollo, accesible desde cualquier IP
        proxy: {
          '/api': {
            target: 'http://localhost:8000',
            changeOrigin: true,
            rewrite: (path) => path.replace(/^\/api/, ''),
          },
        },
      }),
    },
    build: {
      outDir: 'dist',
      sourcemap: isProduction, // Generar sourcemaps solo en producción
    },
  };
});
