import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./"),
        },
    },
    build: {
        outDir: 'assets/built',
        emptyOutDir: true,
        rollupOptions: {
            input: {
                'digital-products-hero': 'src/digital-products-hero.tsx',
                'automation-orbit-entry': 'src/automation-orbit-entry.tsx',
                'projects-demo-entry': 'src/projects-demo-entry.tsx'
            },
            output: {
                entryFileNames: '[name].js',
                chunkFileNames: '[name].js',
                assetFileNames: '[name].[ext]'
            }
        }
    },
    define: {
        'process.env': {}
    }
});
