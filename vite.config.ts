import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from "vite-tsconfig-paths"
import svgr from 'vite-plugin-svgr'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths(), svgr()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // Vendor chunks
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'chakra-vendor': ['@chakra-ui/react', '@emotion/react'],
          'query-vendor': ['@tanstack/react-query', '@tanstack/react-query-devtools'],
          'form-vendor': ['formik', 'yup'],
          'chart-vendor': ['recharts'],
          'utils-vendor': ['axios', 'date-fns', 'lucide-react', 'sonner'],
        },
      },
    },
    chunkSizeWarningLimit: 1000, // Increase limit to 1MB for better visibility
  },
})
