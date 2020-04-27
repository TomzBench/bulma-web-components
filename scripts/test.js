let path = require('path'),
  logger = require('./logger'),
  utils = require('./utils'),
  fs = require('fs'),
  cp = require('child_process');

(async () => {
  try {
    let { root } = await utils.seekRoot('linq-developer-portal'),
      args = process.argv.slice(2),
      env = Object.assign({}, process.env, { ATXMON_PATH: root }),
      shell = process.platform === 'win32' ? true : false;
    await utils.spawn('jest', args, { stdio: 'inherit', shell, env });
  } catch (e) {
    logger.error(e);
  }
})();
