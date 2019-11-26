import typescript from 'rollup-plugin-typescript';

export default {
  input: 'src/index.ts',
  output: {
    file: 'dist/bundle.js',
    format: 'cjs'
  },
  external: [
    'tslib',
    'fs',
    'util',
    'mkdirp-promise',
    'path'
  ],
  plugins: [
    typescript()
  ]
}
