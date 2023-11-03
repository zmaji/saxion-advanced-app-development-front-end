module.exports = {
  preset: 'jest-expo',
  transform: {
    '^.+\\.js$': 'babel-jest',
  },
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.(tsx|js)$',
  transformIgnorePatterns: [
    'node_modules/(?!((jest-)?react-native|@fortawesome/react-native-fontawesome|' +
    '@react-native(-community)?)|expo(nent)?|@expo(nent)?/.*' +
    '|@expo-google-fonts/.*|react-navigation|@react-navigation/.*|' +
    '@unimodules/.*|unimodules|sentry-expo|native-base|react-native-svg)',
  ],
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
