const merge = require('webpack-merge');
const common = require('./webpack/webpack.common.config.js');

module.exports = merge(common, {
  watch: true,
  devtool: 'source-map',
  module: {
    loaders: [
      {
        test: /.spec\.js$/,
        loader: 'babel-loader',
        query: {
          presets: ['env', 'es2015', 'react'],
          cacheDirectory: true
        }
      }
    ]
  },
  devServer: {
    port: 3002,
    contentBase: common.context,
    disableHostCheck: true,
    open: process.env.WEBPACK_SERVER_BROWSER || 'Yandex',
    historyApiFallback: true,

    stats: {
      warnings: false
    },
  }
});
