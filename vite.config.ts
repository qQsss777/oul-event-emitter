import { resolve } from 'path';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import typescript from '@rollup/plugin-typescript';
import terser from '@rollup/plugin-terser';

export default defineConfig({
  build: {
    minify: true,
    rollupOptions:{
      output:{
        preserveModules:true,
        inlineDynamicImports: false,
        compact: true,
      }
    },
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      fileName: '[name]',
      name: "EventEmitter",
      formats:['es'],
    },
  },
  plugins: [
    dts(),
    terser(),
    typescript({
      target: "ES2017"
    }),],
});