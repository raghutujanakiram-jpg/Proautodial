import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    return {
      server: {
        port: 3000,
        host: '0.0.0.0',
        proxy: {
          '/ringg-api': {
            target: 'https://prod-api.ringg.ai/ca/api/v0',
            changeOrigin: true,
            rewrite: (path) => path.replace(/^\/ringg-api/, ''),
            secure: false,
            configure: (proxy, _options) => {
              proxy.on('proxyReq', (proxyReq, req, _res) => {
                proxyReq.removeHeader('Origin');
                proxyReq.removeHeader('Referer');
              });
              proxy.on('proxyRes', (proxyRes, req, res) => {
                proxyRes.headers['access-control-allow-origin'] = '*';
                proxyRes.headers['access-control-allow-methods'] = 'GET, POST, PUT, DELETE, OPTIONS';
                proxyRes.headers['access-control-allow-headers'] = 'X-API-KEY, Content-Type, Authorization, xi-api-key';
              });
            },
          },
          '/elevenlabs-api': {
            target: 'https://api.elevenlabs.io/v1',
            changeOrigin: true,
            rewrite: (path) => path.replace(/^\/elevenlabs-api/, ''),
            secure: false,
             configure: (proxy, _options) => {
              proxy.on('proxyRes', (proxyRes, req, res) => {
                proxyRes.headers['access-control-allow-origin'] = '*';
                proxyRes.headers['access-control-allow-methods'] = 'GET, POST, PUT, DELETE, OPTIONS';
                proxyRes.headers['access-control-allow-headers'] = 'xi-api-key, Content-Type, Authorization';
              });
            },
          }
        }
      },
      plugins: [react()],
      define: {
        'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
        'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY)
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, './src'),
        }
      }
    };
});