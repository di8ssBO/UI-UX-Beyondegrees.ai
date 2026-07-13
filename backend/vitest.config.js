import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'node',
    setupFiles: ['./tests/setup.js'],   // chạy TRƯỚC mọi file test
    fileParallelism: false,             // test DB: chạy tuần tự cho an toàn
  },
});