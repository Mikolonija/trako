import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';
import svgLoader from 'vite-svg-loader';
import { compression } from 'vite-plugin-compression2';

export default defineConfig({
  plugins: [
    vue(),
    svgLoader(),
    compression({
      algorithm: 'gzip',
      deleteOriginalAssets: false,
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
          @use "@/styles/variables.scss" as *;
          @use "@/styles/mixins.scss" as *;
          @use "@/styles/colors.scss" as *;
        `,
      },
    },
  },
});
