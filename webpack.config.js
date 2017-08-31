const config = require('./bin/config');
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const UglifyJsPlugin = require('webpack/lib/optimize/UglifyJsPlugin');

const __DEV__ = config.globals.__DEV__;
const __PROD__ = config.globals.__PROD__;

const plugins = [
  new webpack.DefinePlugin(config.globals)
];

if (__DEV__) {
  const _plugins = [
    new HtmlWebpackPlugin({
      title: 'light pdf viewer',
      template: path.join(config.path.root, 'index.html'),
      filename: path.resolve(config.path.dist, 'index.html'),
      inject: 'body',
      minify: {
        collapseWhitespace: false,
        removeComments: true,
        removeAttributeQuotes: false
      }
    })
  ];
  plugins.push(..._plugins);
} else if (__PROD__) {
  const _plugins = [
    new UglifyJsPlugin({
      mangle: true,
      sourceMap: false,
      compressor: {
        warnings: true,
        drop_debugger: true,
        dead_code: true
      },
      test: /light-pdf-viewer\.min\.js/i
    }),
    new ExtractTextPlugin({
      filename: 'css/[name].css',
      allChunks: true
    })
  ];
  plugins.push(..._plugins);
}

const postcssLoader = {
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
};

const styleLoader = {
  test: /\.less$/,
  use: __DEV__ ? [
    'style-loader',
    'css-loader',
    postcssLoader,
    'less-loader'
  ] : ExtractTextPlugin.extract({
    fallback: 'style-loader',
    use: [
      'css-loader',
      postcssLoader,
      'less-loader'
    ]
  })
};

module.exports = {
  devtool: __DEV__ ? '#source-map' : false,

  entry: __DEV__ ? {
    main: path.resolve(config.path.app, 'dev.js'),
  } : {
    'light-pdf-viewer': path.resolve(config.path.app, 'index.js'),
    'light-pdf-viewer.min': path.resolve(config.path.app, 'index.js')
  },

  output: {
    filename: 'js/[name].js',
    path: path.resolve(config.path.dist),
    library: 'light-pdf',
    libraryTarget: 'umd'
  },

  externals: [
    {
      'react': {
        root: 'React',
        commonjs2: 'react',
        commonjs: 'react',
        amd: 'react'
      }
    },
    {
      'react-dom': {
        root: 'ReactDOM',
        commonjs2: 'react-dom',
        commonjs: 'react-dom',
        amd: 'react-dom'
      }
    },
    {
      'pdfjs-dist/build/pdf': {
        root: 'PDFJS',
        commonjs2: 'pdfjs-dist/build/pdf',
        commonjs: 'pdfjs-dist/build/pdf',
        amd: 'pdfjs-dist/build/pdf'
      }
    },
    {
      'pdfjs-dist/web/pdf_viewer': {
        root: 'PDFJS',
        commonjs2: 'pdfjs-dist/web/pdf_viewer',
        commonjs: 'pdfjs-dist/web/pdf_viewer',
        amd: 'pdfjs-dist/web/pdf_viewer'
      }
    }
  ],

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
      styleLoader,
      {
        test: /\.(jpeg|jpg|png|gif)$/,
        use: 'url?limit=8192'
      },
      {
        test: /\.svg$/,
        use: 'svg-url-loader?limit=10000&mimetype=image/svg+xml'
      }
    ]
  }
};
