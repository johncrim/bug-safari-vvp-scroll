import { nodeResolve } from '@rollup/plugin-node-resolve';

export default {
  input: 'tsc-out/bug-repro.js',
  output: {
    file: 'dist/index.mjs',
    format: 'esm'
  },
  plugins: [nodeResolve()],
};
