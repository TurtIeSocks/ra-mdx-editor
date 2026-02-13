/// <reference types="vitest" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'
import dts from 'vite-plugin-dts'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), dts({ tsconfigPath: './tsconfig.app.json' })],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'RaMdxEditor',
      fileName: 'ra-mdx-editor',
    },
    rollupOptions: {
      external: ['react', 'react-dom', 'react-admin', '@mdxeditor/editor'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          'react-admin': 'ReactAdmin',
          '@mdxeditor/editor': 'MDXEditor',
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

