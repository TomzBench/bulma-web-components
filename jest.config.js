module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  coverageDirectory: 'coverage',
  setupFiles: ['./components/__tests__/setup.ts'],
  testMatch: ['**/?(*.)+(spec|test).[t]s?(x)']
};
