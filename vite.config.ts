/// <reference types="vitest/config" />

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'
import dts from 'vite-plugin-dts'

export default defineConfig({
  plugins: [
    react(),
    dts({
      tsconfigPath: './tsconfig.app.json',
      exclude: ['src/**/*.test.ts', 'src/**/*.test.tsx', 'src/setupTests.ts'],
    }),
  ],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'RaMdxEditor',
      fileName: 'ra-mdx-editor',
    },
    emptyOutDir: true,
    rollupOptions: {
      external: [
        'react',
        'react-dom',
        'react-admin',
        '@mdxeditor/editor',
        '@mui/material',
      ],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          'react-admin': 'ReactAdmin',
          '@mdxeditor/editor': 'MDXEditor',
          '@mui/material': 'MaterialUI',
        },
      },
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setupTests.ts',
  },
})
