module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/packages/testing-utils/jest.setup.ts'],
  moduleNameMapper: {
    '^@short-video/(.*)$': '<rootDir>/packages/$1/src',
  },
};
