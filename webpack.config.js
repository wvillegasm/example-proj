const path = require('path')
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')

/***
 * https://github.com/webpack-contrib/purifycss-webpack
 * @type {string[]}
 */

const pck = require('./package')

const VENDOR_LIST = Object.keys(pck.dependencies)

const config = {
  entry: {
    bundle: './src/index.js',
    vendor: VENDOR_LIST
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/[name].[chunkhash].js',
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              'babel-preset-env',
              'react',
            ],
          },
        },
      },
      {
        test: /\.css?/,
        use: ExtractTextWebpackPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader',
        }),

      },
      {
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 1000,
            },
          },
          'image-webpack-loader',
        ],
        test: /\.(jpe?g|png|gif|svg)$/,
      },
    ],
  },
  plugins: [
    new ExtractTextWebpackPlugin('css/[name].[contenthash].css'),
    new webpack.optimize.CommonsChunkPlugin({
      names: ['vendor', 'manifest'],
    }),
    new HtmlWebpackPlugin({
      template: 'src/index.html',
    }),
    new webpack.NodeEnvironmentPlugin(['NODE_ENV', 'DEBUG']),
  ],
  devServer: {
    port: 3001,
    contentBase: path.resolve(__dirname, 'dist'),
    open: true,
    compress: true,
    stats: 'errors-only',
    clientLogLevel: 'info',
  },
}

module.exports = config
