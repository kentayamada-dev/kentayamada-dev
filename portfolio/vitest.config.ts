import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    alias: {
      '@/typeGuards': new URL('./src/app/typeGuards/index.ts', import.meta.url).pathname
    }
  }
});
