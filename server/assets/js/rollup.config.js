import resolve from '@rollup/plugin-node-resolve'
import babel from 'rollup-plugin-babel'
import includePaths from 'rollup-plugin-includepaths'
import prettier from 'rollup-plugin-prettier'

const includePathOptions = {
  include: {},
  paths: ['server/components'],
  external: [],
  extensions: ['.js'],
}

const config = {
  input: 'server/assets/js/main-es.js',
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
    includePaths(includePathOptions),
  ],
  watch: {
    exclude: ['node_modules/**'],
    clearScreen: false,
  },
}

export default config
