import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import { viteStaticCopy } from "vite-plugin-static-copy";
import path from 'path';

// https://vitejs.dev/config/
export default ({ mode }: { mode: string }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };
  return defineConfig({
    base: '/',
    plugins: [
      react(),
      viteStaticCopy({
        targets: [
          {
            src: 'locales/**/*',
            dest: 'locales'
          }
        ]
      })],
    server: {
      proxy: {
        '/api': {
          target: process.env.VITE_API_BASE_URL,
          changeOrigin: true,
          secure: false,
        },
      },
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
      },
    },
    build: {
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: ['react', 'react-dom', 'react-router-dom'],
            // Add other large dependencies or modules here
          },
        },
      },
      chunkSizeWarningLimit: 1000, // Increase the warning limit if needed (in kB)
    },
  })
};
