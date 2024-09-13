import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import { viteStaticCopy } from "vite-plugin-static-copy";


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
  })
};
