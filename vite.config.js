import { defineConfig } from 'vite';

export default defineConfig({
  base: '/book-project/', // Replace 'my-vite-app' with your repository name
  build: {
    outDir: 'dist', // Default is 'dist'
  }
});