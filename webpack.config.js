const path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');

const ROOT = path.resolve(__dirname);
const PUBLIC_PATH = path.resolve(ROOT, 'public');
const DIST_PATH = path.resolve(ROOT, 'dist');

const plugins = [
  new HtmlWebpackPlugin({
    title: 'PDF Viewer',
    template: path.join(PUBLIC_PATH, 'index.html'),
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
  entry: './src/index.js',

  output: {
    filename: 'pdf-viewer.js',
    path: path.resolve(DIST_PATH)
  },

  devServer: {
    headers: {
      'Access-Control-Allow-Origin': '*'
    },
    historyApiFallback: true,
    hot: true,
    inline: true,
    quiet: false,
    noInfo: false,
    stats: {
      color: true
    },
    port: 4000,
    host: '127.0.0.1',
    contentBase: '../public/index.html'
  },

  plugins,

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          cacheDirectory: true,
          plugins: ['transform-runtime'],
          presets: [['es2015', { modules: false }], 'react', 'stage-0']
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
