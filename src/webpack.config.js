const HtmlWebpackPlugin = require('html-webpack-plugin');
const config = require('frint-config');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin')

const extractLess = new ExtractTextPlugin({
  filename: "[name].[contenthash].css"
});

module.exports = {
  entry: {
    core: path.resolve(__dirname, 'core/index.js'),
    'app-todos': path.resolve(__dirname, 'app-todos/index.js')
  },
  devtool: 'source-map',
  output: {
    path: path.resolve(__dirname, 'build/js'),
    filename: '[name].js',
    libraryTarget: 'umd'
  },
  module: {
    rules: [
      {
        test: /\.(js)$/,
        loader: 'babel-loader',
        query: {
          presets: [
            'travix'
          ]
        }
      },
      {
        test: /\.less$/,
        issuer: /\.less$/,
        include: [
          path.resolve(__dirname, "less"),
          path.resolve(__dirname, "node_modules")
        ],
        loader: 'less-loader'
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'layouts/index.ejs'),
      filename: path.resolve(__dirname, 'build/index.html'),
      chunksSortMode({ names }) {
        return names[0] === 'core' ? -1 : 1;
      }
    }),
    extractLess
  ],
  externals: []
    .concat(config.lodashExternals)
    .concat(config.rxjsExternals)
    .concat(config.thirdPartyExternals)
    .concat(config.frintExternals)
};
