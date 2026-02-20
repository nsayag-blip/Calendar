import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [
    react()
  ],
  base: './',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    cssCodeSplit: false,
    rollupOptions: {
      output: {
        entryFileNames: 'assets/app.bundle.js',
        chunkFileNames: 'assets/[name].js',
        assetFileNames: (assetInfo) => {
          if (assetInfo.name && assetInfo.name.endsWith('.css')) {
            return 'assets/index.css'
          }
          return 'assets/[name].[ext]'
        },
        format: 'iife',
        name: 'ReactApp'
      }
    }
  },
  server: {
    port: 3000,
    cors: true,
    host: true,
    strictPort: true,
    // Disable HMR - it won't work in Salesforce anyway
    hmr: false,
    watch: {
      // Use polling (necessary for some VM setups)
      usePolling: true,
      interval: 100
    }
  }
})