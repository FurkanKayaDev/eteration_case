const {resolve} = require('path');

module.exports = {
  preset: 'react-native',
  transformIgnorePatterns: [resolve(__dirname, '../../packages')],
  setupFiles: ['<rootDir>/jest.setup.js'],
};
