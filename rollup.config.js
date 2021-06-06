import { nodeResolve } from '@rollup/plugin-node-resolve';

export default {
  input: 'dist/bug-repro.js',
  output: {
    file: 'index.mjs',
    format: 'esm'
  },
  plugins: [nodeResolve()],
};
