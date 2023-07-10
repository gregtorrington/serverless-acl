import dotenv from 'dotenv';
import path from 'path';
import tsconfigPaths from 'vite-tsconfig-paths';
import { defineProject } from 'vitest/config';

export default defineProject(() => {
  dotenv.config({
    path: '.env.test',
  });

  return {
    plugin: tsconfigPaths(),
    test: {
      globals: true,
      include: ['**/*.test.ts'],
    },
    resolve: {
      alias: {
        '@backend-core-functions': path.resolve(__dirname, './functions'),
        '@backend-core-resources': path.resolve(__dirname, './resources'),
        '@backend-core-rest-api': path.resolve(__dirname, './rest-api'),
      },
    },
  };
});
