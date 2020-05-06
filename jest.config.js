module.exports = {
  preset: 'ts-jest',
  coverageDirectory: 'coverage',
  setupFiles: ['./src/components/__tests__/setup.ts'],
  testEnvironment: 'jsdom',
  // transform: {
  //   '^.+\\.js$': 'babel-jest'
  // },
  // transformIgnorePatterns: [], // default ["node_modules"]
  testMatch: ['**/?(*.)+(spec|test).[t]s?(x)']
};
