const atxConfig = require('./atx.config.js');

// Create some devices
let CONTAINER_COUNT = 0;
let CONTAINER_PORT_START = 44000;
let devices = [];
for (let i = 0; i < CONTAINER_COUNT; i++) {
  devices.push({
    image: 'linq2',
    container: true,
    httpPort: CONTAINER_PORT_START++,
    httpsPort: CONTAINER_PORT_START++
  });
}

// Configure backend
let apiServer = Object.assign({}, atxConfig.apiServer, {
  httpPort: 3000,
  zmtpPort: 33455,
  container: false
});

module.exports = Object.assign(
  {},
  atxConfig,
  { session: 'atx.config.user' },
  { devices },
  { apiServer }
);
