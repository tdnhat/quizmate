import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
    // Load env file based on mode (development, production)
    const env = loadEnv(mode, process.cwd(), '');
    
    return {
        plugins: [react(), tailwindcss()],
        build: {
            outDir: "dist", // Ensure this matches the workflow configuration
            sourcemap: false, // Disable sourcemaps in production for better performance
            minify: 'terser', // Use terser for better minification
            terserOptions: {
                compress: {
                    drop_console: true, // Remove console.log in production
                },
            },
        },
        resolve: {
            alias: {
                "@": path.resolve(__dirname, "./src"),
            },
        },
        server: {
            port: 3000,
            open: true,
            allowedHosts: ["localhost", ".ngrok-free.app", env.VITE_API_URL],
            proxy: {
                "/api": {
                    target: env.VITE_API_URL || "http://localhost:5118",
                    changeOrigin: true,
                    rewrite: (path) => path.replace(/^\/api/, ""),
                },
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
            'process.env.VITE_API_URL': JSON.stringify(env.VITE_API_URL),
        },
        base: '/',
    }
});
