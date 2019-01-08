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

        proxy: [
            {
                context: ['/'],
                target: 'http://192.168.1.153:5000/',
                pathRewrite: {'^/': '/'},
                secure: false,
                onProxyReq: (proxyReq, req, res) => {
                    proxyReq.setHeader('Host', '192.168.1.153');
                }
            }
        ]
    },
});
