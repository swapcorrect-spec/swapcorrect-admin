import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import svgr from "vite-plugin-svgr";
import {
  buildContentSecurityPolicy,
  securityHeaders,
} from "./csp.config";
import { securityHeadersPlugin } from "./vite-plugin-security-headers";

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const isDev = mode === "development";
  const apiBaseUrl = env.VITE_API_BASE_URL;
  const csp = buildContentSecurityPolicy({ isDev, apiBaseUrl });
  const headers = securityHeaders(csp);

  return {
    plugins: [
      react(),
      tsconfigPaths(),
      svgr(),
      securityHeadersPlugin({ isDev, apiBaseUrl }),
    ],
    server: {
      headers,
    },
    preview: {
      headers,
    },
    build: {
      sourcemap: false,
      rollupOptions: {
        output: {
          manualChunks: {
            // Vendor chunks
            "react-vendor": ["react", "react-dom", "react-router-dom"],
            "chakra-vendor": ["@chakra-ui/react", "@emotion/react"],
            "query-vendor": [
              "@tanstack/react-query",
              "@tanstack/react-query-devtools",
            ],
            "form-vendor": ["formik", "yup"],
            "chart-vendor": ["recharts"],
            "utils-vendor": ["axios", "date-fns", "lucide-react", "sonner"],
          },
        },
      },
      chunkSizeWarningLimit: 1000, // Increase limit to 1MB for better visibility
    },
  };
});
