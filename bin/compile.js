const config = require('./config');
const fs = require('fs-extra');
const webpack = require('webpack');
const webpackConfig = require('../webpack.config');

// Wrapper around webpack to promisify its compiler and supply friendly logging
const webpackCompiler = (webpackConfig) =>
  new Promise((resolve, reject) => {
    const compiler = webpack(webpackConfig)

    compiler.run((err, stats) => {
      if (err) return reject(err)
      console.log('Compiled successfully.');

      const jsonStats = stats.toJson({
        modulesSort: 'size'
      });
      resolve(jsonStats);
    })
  })

const compile = () => {
  return Promise.resolve()
    .then(() => webpackCompiler(webpackConfig))
    .then(stats => {
      if (stats.warnings.length) {
      }
      fs.copySync(config.path.public, config.path.dist);
      console.log('Public sources copy successfully.');

      fs.writeFile('./stats.json', JSON.stringify(stats), (err) => {
         if(err) throw err;
         console.log('Webpack profile stats saved.');
       });
    })
    .catch((err) => {
      console.log(err);
      process.exit(1)
    })
}

compile()
