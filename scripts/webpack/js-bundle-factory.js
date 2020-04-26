const autoprefixer = require('autoprefixer');

class JsBundleFactory {
  constructor({ pathResolver }) {
    this.pathResolver_ = pathResolver;
  }

  createJsBundle() {
    const absPath = (...args) => this.pathResolver_.getAbsolutePath(...args);
    return {
      name: 'js-bundle',
      entry: [absPath('/components/bulma/input/input.ts')],
      output: { filename: 'bundle.js' },
      resolve: { extensions: ['.js', '.scss', '.ts'] },
      module: {
        rules: [
          {
            test: /\.scss$/,
            use: [
              { loader: 'css-loader', options: { sourceMap: true } },
              {
                loader: 'postcss-loader',
                options: {
                  plugins: () => [autoprefixer({ grid: false })],
                  sourceMap: true
                }
              },
              {
                loader: 'sass-loader',
                options: {
                  sourceMap: true,
                  sassOptions: { includePaths: [absPath('/node_modules')] }
                }
              }
            ]
          },
          {
            test: /\.(png|jpe?g|svg)$/,
            loader: 'url-loader',
            options: {
              name: 'assets/[name].[ext]'
            }
          },
          {
            test: /\.js$/,
            loader: 'babel-loader',
            query: {
              sourceType: 'unambiguous',
              presets: ['@babel/preset-env'],
              plugins: [
                '@babel/plugin-proposal-class-properties',
                '@babel/plugin-transform-runtime',
                [
                  '@babel/plugin-proposal-decorators',
                  { decoratorsBeforeExport: true }
                ]
              ]
            }
          },
          {
            test: /\.tsx?$/,
            loader: 'ts-loader'
          }
        ]
      }
    };
  }
}

module.exports = JsBundleFactory;
