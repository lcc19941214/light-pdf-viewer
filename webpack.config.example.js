const path = require('path');

module.exports = {
  devtool: false,

  entry: './example/index.js',

  output: {
    filename: 'example.js',
    path: path.resolve(__dirname, './example')
  },

  externals: {
    'react': 'React',
    'react-dom': 'ReactDOM',
    'pdfjs-dist/build/pdf': 'PDFJS',
    'pdfjs-dist/web/pdf_viewer': 'PDFJS'
  },

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          cacheDirectory: true
        }
      }
    ]
  }
};
