const HtmlWebpackPlugin = require('html-webpack-plugin');
const config = require('frint-config');
const path = require('path');

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
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: [
            'travix',
          ],
        },
      },
      {
        test: /\.less$/,
        exclude: /node_modules/,
        use: [{
          loader: 'style-loader'
        }, {
          loader: "css-loader"
        }, {
          loader: 'less-loader'
        }]
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
    })
  ],
  externals: []
    .concat(config.lodashExternals)
    .concat(config.rxjsExternals)
    .concat(config.thirdPartyExternals)
    .concat(config.frintExternals)
};