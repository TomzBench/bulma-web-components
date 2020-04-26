//
//
//
const autoprefixer = require('autoprefixer');

class JsBundleFactory {
  constructor({ pathResolver }) {
    this.pathResolver_ = pathResolver;
  }

  createJsBundle() {
    const absPath = (...args) => this.pathResolver_.getAbsolutePath(...args);
    return {
      name: 'js-bundle',
      entry: [
        absPath('/components/about-bar/about-bar.ts'),
        absPath('/components/alerts-table/alerts-table.ts'),
        absPath('/components/forms/about/about.ts'),
        absPath('/components/forms/output-action-list/output-action-list.ts'),
        absPath('/components/forms/submit-button/submit-button.ts'),
        absPath('/components/forms/unix/unix.ts'),
        absPath('/components/io-status/io-status.ts'),
        absPath('/components/linq-outputs-table/linq-outputs-table.ts'),
        absPath('/components/status-view/status-view.ts'),
        absPath('/components/material/material-circular-progress.ts'),
        absPath('/components/material/material-icon-button-toggle.ts'),
        absPath('/components/material/material-icon-button.ts'),
        absPath('/components/material/material-icon.ts'),
        absPath('/components/material/material-menu-surface.ts'),
        absPath('/components/material/material-menu.ts'),
        absPath('/components/material/material-list.ts'),
        absPath('/components/material/material-list-item.ts'),
        absPath('/components/material/material-button.ts'),
        absPath('/components/material/material-textfield.ts'),
        absPath('/components/material/material-top-app-bar.ts')
      ],
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
