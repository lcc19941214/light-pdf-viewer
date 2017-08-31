const path = require('path');

const root = path.resolve(__dirname, '..');
const config = {
  path: {
    root,
    app: path.resolve(root, 'src'),
    dist: path.resolve(root, 'dist'),
    lib: path.resolve(root, 'lib'),
    public: path.resolve(root, 'public')
  },
  globals: {
    'process.env': {
      NODE_ENV: JSON.stringify(process.env.NODE_ENV)
    },
    __DEV__: process.env.NODE_ENV === 'development',
    __PROD__: process.env.NODE_ENV === 'production'
  }
};

module.exports = config;
