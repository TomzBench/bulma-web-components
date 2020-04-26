// local
const devServer = require('./scripts/webpack/dev-server-config');
const PathResolver = require('./scripts/webpack/path-resolver');
const JsBundleFactory = require('./scripts/webpack/js-bundle-factory');

// external
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const path = require('path');
const autoprefixer = require('autoprefixer');

const pathResolver = new PathResolver();
const jsBundleFactory = new JsBundleFactory({ pathResolver });

module.exports = merge([
  jsBundleFactory.createJsBundle(),
  devServer({ port: 9000 }),
  {
    plugins: [
      new CleanWebpackPlugin(),
      // new HtmlWebpackPlugin({
      //   title: 'Demo',
      //   template: './demo/index.html'
      // })
    ]
  }
]);
