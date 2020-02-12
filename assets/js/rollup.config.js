import resolve from '@rollup/plugin-node-resolve'
import babel from 'rollup-plugin-babel'
import prettier from 'rollup-plugin-prettier'

const config = {
  input: 'assets/js/main-es.js',
  output: {
    file: 'assets/js/main.js',
    format: 'iife',
  },
  plugins: [
    resolve(),
    babel({
      exclude: 'node_modules/**',
      babelrc: false,
      presets: [['@babel/env', { modules: false }]],
    }),
    prettier({ parser: 'babel' }),
  ],
}

export default config
