var path = require('path');
var webpack = require('webpack');

module.exports = {
  devtool: '#inline-source-map',
  entry: './client-src/app.jsx',
  output: { path: __dirname + '/client', filename: './app.js' },
  module: {
    loaders: [
      {
        test: /.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'react']
        }
      }
    ]
  },
  resolve: {
    extensions: ['', '.js', '.jsx', '.json'],
    modules: [
      path.resolve('./client-src'),
      './node_modules'
    ]
  }
};
