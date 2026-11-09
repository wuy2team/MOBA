import { fileURLToPath, URL } from 'node:url';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig, loadEnv } from 'vite';

/**
 * Chuẩn hóa base path cho deploy tĩnh.
 * - Mặc định "/" (Netlify, Vercel, chạy local).
 * - GitHub Pages: đặt VITE_BASE=/<ten-repo>/ khi build.
 */
function normalizeBase(raw: string | undefined): string {
  const value = (raw ?? '').trim();
  if (value === '' || value === '/') return '/';
  if (value === './') return './';
  const withLeading = value.startsWith('/') ? value : `/${value}`;
  return withLeading.endsWith('/') ? withLeading : `${withLeading}/`;
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), 'VITE_');
  return {
    base: normalizeBase(env.VITE_BASE),
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
    build: {
      target: 'es2022',
      // Phaser là chunk lười tải riêng (~1.2 MB chưa nén) – chỉ tải khi vào trận.
      chunkSizeWarningLimit: 1600,
    },
  };
});
