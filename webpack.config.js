var webpack = require('webpack');
var autoprefixer = require('autoprefixer');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    devtool: 'source-map',
    entry: [
      './src/js/app.js',
      './src/css/app.css',
      'webpack/hot/dev-server',
      'webpack-dev-server/client?http://localhost:8080',
    ],
    output: {
      path: './dist',
      filename: '[name].js'
    },
    module: {
      loaders: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          loader: 'babel',
          query: {
              presets: ['react', 'es2015']
          }
        },
        { test: /\.png$/, loader: 'url?limit=100000' },
        { test: /\.jpg$/, loader: 'file' },
        { test: /\.gif$/, loader: 'file' },
        // Extract css files
        {
            test: /\.css$/,
            loader: ExtractTextPlugin.extract('css?sourceMap!postcss-loader?sourceMap')
        },
        {
          test: /\.scss$/,
          loader: ExtractTextPlugin.extract(
              'css?sourceMap!sass?sourceMap!postcss-loader?sourceMap'
          )
        }
      ]
    },
    postcss: function () {
      return [autoprefixer];
    },
    plugins: [
      new webpack.optimize.DedupePlugin(),
      new webpack.optimize.OccurenceOrderPlugin(),
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoErrorsPlugin(),
      new ExtractTextPlugin('[name].css')
    ]
};
