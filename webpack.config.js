var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");


module.exports = {
  entry: './static/js/app.js',
  output: {
    path:'./build/',
    filename: 'bundle.js'
  },
  plugins: [
    new ExtractTextPlugin('main.css')
  ],
  module: {
    loaders: [
      {
        loader: ExtractTextPlugin.extract('style-loader','css-loader!sass-loader'),
        include: /static/,
        test: /\.sass$/
      },
      {
        test:/\.js$/,
        include: /static/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015']
        }
      }
    ]
  }
};
