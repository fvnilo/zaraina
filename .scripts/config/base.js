const path = require('path');

const projectRoot = path.resolve(__dirname, '../../');

module.exports = {
  resolve: {
    alias: {
      '@': path.join(projectRoot, 'src'),
    },
    extensions: ['.ts', '.tsx', '.js', '.less']
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        exclude: /node_modules/
      },
      {
        test: /\.less$/,
        use: [
          {
            loader: "style-loader" // creates style nodes from JS strings
          },
          {
            loader: "css-loader" // translates CSS into CommonJS
          },
          {
            loader: "less-loader" // compiles Less to CSS
          }]
      }
    ]
  }
}