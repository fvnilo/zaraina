const path = require('path');

const offlineConfig = require('./offline');

const projectRoot = path.resolve(__dirname, '../../');

module.exports = {
  resolve: {
    alias: {
      '@root': path.join(projectRoot, 'src'),
    },
    extensions: ['.ts', '.tsx', '.js']
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  }
}