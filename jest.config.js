module.exports = {
  testEnvironment: 'node',
  moduleFileExtensions: ['js', 'ts'],
  testMatch: ['**/tests/**/*.test.(js|ts)'],
  transform: {
    '^.+\\.(ts)$': 'ts-jest',
  },
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.json',
    },
  },
};
