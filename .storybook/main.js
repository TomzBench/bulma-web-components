const PathResolver = require('../scripts/webpack/path-resolver');
const JsBundleFactory = require('../scripts/webpack/js-bundle-factory');
const merge = require('webpack-merge');

const pathResolver = new PathResolver();
const jsBundleFactory = new JsBundleFactory({ pathResolver });

const storybookConfig = require('../scripts/webpack.storybook');

module.exports = {
  stories: ['../src/components/**/*.stories.[tj]s'],
  webpackFinal: async (config, { configType }) => {
    //
    // Replace file-loader with url-loader & babel-loader with our babel-loader
    //
    config.module.rules = config.module.rules.filter(obj => {
      let str = JSON.stringify(obj);
      return !(str.includes('file-loader') || str.includes('babel-loader'));
    });

    //
    // Now merge storybook webpack with our webpack.
    //
    const bundle = jsBundleFactory.createJsBundle();
    return merge([config, bundle]);
  }
};
