const atxConfig = require('./atx.config.js');
module.exports = Object.assign({}, atxConfig, {
  session: 'atx.user.config',
  dockerHost: '172.17.0.1',
  devServerPort: 33443,
  devServerHost: '127.0.0.1',
  httpPort: 33444,
  zmtpPort: 33456,
  zmtpsPort: 33457,
  containers: [{ image: 'atxmon' }, { image: 'linq2' }]
});
