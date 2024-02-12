import { dirname, resolve } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))

export default {
  target: 'node',
  mode: 'production',
  entry: './index.ts',
  output: {
    path: resolve(__dirname, './dist'),
    filename: 'index.js',
    chunkFormat: 'commonjs',
  },
  experiments: {
    outputModule: true,
  },
  plugins: [],
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  devtool: false,
}