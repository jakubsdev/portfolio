// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://jakubs.dev',
  vite: {
    plugins: [tailwindcss()]
  }
});