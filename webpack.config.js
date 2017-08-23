const path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');

const ROOT = path.resolve(__dirname);
const APP_PATH = path.resolve(ROOT, 'src');
const DIST_PATH = path.resolve(ROOT, 'dist');
const PUBLIC_PATH = path.resolve(ROOT, 'public');

const plugins = [
  new HtmlWebpackPlugin({
    title: 'PDF Viewer',
    template: path.join(ROOT, 'index.html'),
    filename: path.resolve(DIST_PATH, 'index.html'),
    inject: 'body',
    minify: {
      collapseWhitespace: false,
      removeComments: true,
      removeAttributeQuotes: false
    }
  })
];

module.exports = {
  entry: path.resolve(APP_PATH, 'index.js'),

  output: {
    filename: 'pdf-viewer.js',
    path: path.resolve(DIST_PATH)
  },

  devServer: {
    historyApiFallback: true,
    hot: true,
    inline: true,
    quiet: false,
    noInfo: false,
    stats: {
      color: true
    },
    port: 4000,
    host: '127.0.0.1'
  },

  plugins,

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          cacheDirectory: true
        }
      },
      {
        test: /\.less$/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              plugins: function() {
                return [
                  require('cssnano')({
                    autoprefixer: {
                      add: true,
                      remove: true,
                      browsers: ['last 10 versions']
                    },
                    discardComments: {
                      removeAll: true
                    },
                    discardUnused: false,
                    mergeIdents: false,
                    reduceIdents: false,
                    safe: true,
                    sourcemap: true
                  })
                ];
              },
              sourceMap: false
            }
          },
          {
            loader: 'less-loader'
          }
        ]
      }
    ]
  }
};
