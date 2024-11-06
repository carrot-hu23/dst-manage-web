import {defineConfig} from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import visualizer from "rollup-plugin-visualizer";

const API_URL = "http://139.159.184.218:8082/"

export default defineConfig({
    plugins: [
        react(),
        visualizer({
            // 可选配置项
            open: true, // 构建完成后自动打开浏览器
            filename: 'build-stats.html', // 生成的报告文件名
            gzipSize: true, // 显示 gzip 大小
            brotliSize: true, // 显示 brotli 大小
        })
    ],
    server: {
        open: false, // 项目启动时自动打开浏览器
        proxy: {
            '/api': {
                target: API_URL,
                changeOrigin: true,
            },
            '/steam': {
                target: API_URL,
                changeOrigin: true,
            },
            '/hello': {
                target: API_URL,
                changeOrigin: true,
            },
        },
    },
    build: {
        outDir: "build", // 设置输出目录与 CRA 保持一致
    },
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"),
        },
    },
});
