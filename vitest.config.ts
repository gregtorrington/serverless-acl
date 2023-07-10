import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    coverage: {
      enabled: true,
      all: true,
      reporter: ['text-summary', 'lcovonly'],
      extension: ['.ts'],
    },
  },
});
