'use strict';

const fs = require('fs-extra');
const path = require('path');
const mkdirp = require('mkdirp');

const webpack = require('webpack');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const buildPath = path.join(process.cwd(), 'build');
const publicPath = path.join(process.cwd(), 'public');

const projectRoot = path.resolve(__dirname, '../');

mkdirp.sync(buildPath);

const compiler = webpack({
  entry: [
    './src/'
  ],
  output: {
    filename: 'app.[hash].js',
    path: buildPath
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
    new ProgressBarPlugin(),
    new webpack.optimize.UglifyJsPlugin({ minimize: true }),
    new HtmlWebpackPlugin({
      template: path.resolve(projectRoot, 'index.html')
    })
  ]
})

compiler.run((err, stats) => {
  if (err) {
    console.log(err)
  } else {
    fs.copySync(publicPath, buildPath)
  }
})
