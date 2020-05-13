const merge = require('webpack-merge');
const webpack = require('webpack');
const commonConfig = require('./webpack.common');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

// TODO add grep...

module.exports = merge(commonConfig(), {
  mode: 'development',
  entry: [
    __dirname + '/../src/components/shared/__tests__/attributes.test.ts',
    __dirname + '/../src/components/shared/__tests__/decorators.test.ts',
    __dirname + '/../src/components/table-user/__tests__/table-user.test.ts',
    __dirname + '/../src/services/io/__tests__/io.service.test.ts',
    __dirname + '/../src/services/router/__tests__/router.service.test.ts',
    __dirname + '/../src/services/user/__tests__/user.service.test.ts',
    __dirname + '/../src/pages/home/__tests__/home.test.ts',
    __dirname + '/../src/__tests__/app.test.ts'
  ]
});
