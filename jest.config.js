module.exports = {
  preset: 'ts-jest',
  coverageDirectory: 'coverage',
  setupFiles: ['./src/components/__tests__/setup.ts'],
  testEnvironment: 'jsdom',
  testMatch: ['**/?(*.)+(spec|test).[t]s?(x)']
};
