'use strict';

var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  context: __dirname,

  debug: process.env.NODE_ENV !== 'production',

  devtool: 'sourcemap',

  entry: './src/index.js',

  externals: [
    {
      react: {
        root: 'React',
        commonjs: 'react',
        commonjs2: 'react',
        amd: 'react'
      }
    }
  ],

  module: {
    loaders: [
      {
        test: /\.jsx$/,
        loader: 'babel-loader?{ optional:["runtime", "es7.objectRestSpread"] }'
      }, {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader!sass-loader')
      }
    ]
  },

  output: {
    path: path.join(__dirname, 'build'),
    filename: 'components.js',
    library: 'Components',
    libraryTarget: 'umd'
  },

  plugins: [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(true),
    new webpack.optimize.AggressiveMergingPlugin(),
    new ExtractTextPlugin('components.css', { allChunks: true })
  ],

  resolve: {
    extensions: ['', '.js', '.jsx'],
    modulesDirectories: ['src', 'node_modules']
  },

  resolveLoader: {
    root: path.join(__dirname, 'node_modules')
  }
};