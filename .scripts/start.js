'use strict'

const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const path = require('path')

const host = 'http://localhost';
const port = 8000;

const projectRoot = path.resolve(__dirname, '../');

const config = {
  entry: [
    `webpack-dev-server/client?${host}:${port.toString()}`,
    'webpack/hot/dev-server',
    './src/'
  ],
  output: {
    filename: 'app.[hash].js',
    path: '/'
  },
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
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new ProgressBarPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(projectRoot, 'public', 'index.html')
    })
  ],
  devtool: 'inline-source-map'
};

const compiler = webpack(config)

compiler.plugin('done', () => {
  console.log(`App is running at ${host}:${port}`)
});

const server = new WebpackDevServer(compiler, {
  historyApiFallback: true,
  hot: true,
  contentBase: './public',
  stats: 'errors-only'
});

server.listen(port);
