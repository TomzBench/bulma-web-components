let path = require('path'),
  logger = require('./logger'),
  utils = require('./utils'),
  fs = require('fs'),
  cp = require('child_process'),
  webpack = require('webpack'),
  webpackConfig = require('./webpack.dev.js'),
  WebpackDevServer = require('webpack-dev-server/lib/Server');

// https://gist.github.com/michaelrambeau/b04f83ef16fc78feee09
// Boot WebpackDevServer ourself

(async () => {
  try {
    let { root } = await utils.seekRoot('portal'),
      args = process.argv.slice(2),
      env = Object.assign({}, process.env, { ATXMON_PATH: root }),
      shell = process.platform === 'win32' ? true : false,
      atxConfig =
        (await loadAtxConfig(`${root}/atx.config.user.js`)) ||
        (await loadAtxConfig(`${root}/atx.config.js`));

    webpackConfig.devServer.proxy = [];
    atxConfig.containers.forEach(async (c, idx) => {
      const image = c.image;
      const name = `${atxConfig.session}.${image}.${idx}`;
      if (c.image === 'atxmon') {
        await utils.startAtxmonContainer({ name, ...atxConfig });
        webpackConfig.devServer.proxy.push({
          context: ['/api'],
          target: `${atxConfig.host}:${atxConfig.httpPort}`,
          bypass: function(req, res, opts) {
            console.log(req);
            console.log(res);
            console.log(opts);
          }
        });
      } else {
        const { zmtpPort, zmtpsPort, dockerHost } = atxConfig;
        await utils.startDeviceContainer({
          dockerHost,
          zmtpPort,
          zmtpsPort,
          name,
          image
        });
      }
    });

    let devServer = new WebpackDevServer(await webpack(webpackConfig));
    let app = devServer.listen(
      atxConfig.devServerPort,
      atxConfig.devServerHost,
      e => {
        if (e) throw e;
      }
    );
    logger.info(`Listening on port ${atxConfig.devServerPort}`);

    ['SIGINT', 'SIGTERM'].forEach(function(sig) {
      process.on(sig, function() {
        devServer.close();
        atxConfig.containers.forEach(async (c, idx) => {
          const name = `${atxConfig.session}.${c.image}.${idx}`;
          await utils.stopDockerContainer(name);
        });
      });
    });
  } catch (e) {
    logger.error(e);
  }
})();

// Read an atx.config file
async function loadAtxConfig(path) {
  return await fs.promises
    .stat(path)
    .then(() => require(path))
    .catch(e => undefined);
}
