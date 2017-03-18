var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");


module.exports = {
  entry: './client/js/index.js',
  output: {
    path:'./build/',
    filename: 'bundle.js'
  },
  devtool: 'source-map',
  plugins: [
    new ExtractTextPlugin('main.css')
  ],
  module: {
    loaders: [
      {
        loader: ExtractTextPlugin.extract('style-loader','css-loader!sass-loader'),
        include: /client/,
        test: /\.sass$/
      },
      {
        test:/\.jsx?$/,
        include: /client/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'react'],
          plugins: ["transform-decorators-legacy", "transform-class-properties"]
        }
      }
    ]
  }
};
