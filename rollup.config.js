import { nodeResolve } from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import commonjs from '@rollup/plugin-commonjs';
import terser from '@rollup/plugin-terser';
import pkg from './package.json';

export default [
  {
    input: 'src/entries/entry.es.ts',
    output: {
      file: pkg.main,
      format: 'es'
    },
    external: [],
    plugins: [
      nodeResolve(),
      typescript({
        compilerOptions: {
          declaration: false
        }
      }),
      commonjs(),
      terser()
    ]
  },
  {
    input: 'src/entries/entry.global.ts',
    output: {
      file: 'es/index.global.js',
      format: 'es'
    },
    external: [],
    plugins: [
      nodeResolve(),
      typescript({
        compilerOptions: {
          declaration: false
        }
      }),
      commonjs(),
      terser()
    ]
  },
  {
    input: 'src/index.ts',
    output: {
      file: pkg.types,
      format: 'es'
    },
    external: [],
    plugins: [
      typescript()
    ]
  }
];