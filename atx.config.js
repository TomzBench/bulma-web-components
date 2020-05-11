module.exports = {
  session: 'atx.config.default', // Arbitrary name
  dockerHost: '172.17.0.1',
  host: '127.0.0.1',
  httpPort: 3002,
  httpsPort: 3003,
  zmtpPort: 33455,
  zmtpsPort: 33456,
  cert: false, // TODO
  key: false, // TODO
  containers: [{ image: 'linq2', count: 4 }, { image: 'atxmon', count: 1 }]
};
