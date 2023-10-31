module.exports = {
  preset: 'react-native',
  transform: {
    '^.+\\.js$': 'babel-jest',
  },
  verbose: true,
  forceExit: true,
  clearMocks: true,
  resetMocks: true,
  collectCoverage: process.env.npm_lifecycle_event === 'test:coverage',
  collectCoverageFrom: ['src/**/*.tsx'],
  coverageReporters: ['json', 'lcov', 'text', 'clover'],
  coverageDirectory: 'coverage',
  coveragePathIgnorePatterns: [
    '/node_modules/',
    '/src/typings',
  ],
};
