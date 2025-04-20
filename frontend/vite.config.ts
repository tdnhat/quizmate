import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
    plugins: [react(), tailwindcss()],
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"),
        },
    },
    server: {
        port: 3000,
        open: true,
        allowedHosts: ["localhost", ".ngrok-free.app"],
        proxy: {
            '/api': {
                target: 'http://localhost:5118',
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/api/, '')
            }
        },
        hmr: {
            overlay: false, // Disable the error overlay
        },
    },
    optimizeDeps: {
        include: ["react-hot-toast", "qrcode.react"],
        force: true, // Force dependency optimization on startup
    },
    define: {
        "process.env.API_URL": JSON.stringify("/api"),
    },
});
