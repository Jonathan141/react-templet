
const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const webpackConfigBase = require('./webpack.base.config')
const OpenBrowserPlugin = require('open-browser-webpack-plugin')

const PORT = 3010
function resolve(relatedPath) {
  return path.join(__dirname, relatedPath)
}
const webpackConfigDev = {
  plugins: [
    // 定义环境变量为开发环境
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development'),
      IS_DEVELOPMETN: true,
    }),
    new OpenBrowserPlugin({
      url: `http://localhost:${PORT}/#/login`,
    }),
  ],
  devtool: 'source-map',
  devServer: {
    proxy: {
      // http://localhost:9000/api/menuList => http://localhost:3000/menuList
      '/api': {
        target: 'http://209.9.51.157:8580',
        // target: 'http://10.63.51.103:8088',
        changeOrigin: true,
        pathRewrite: {
          '^/api' : '',     // rewrite path
        },
      }
    },
    contentBase: resolve('../app'),
    historyApiFallback: false,
    hot: false,
    host: '0.0.0.0',
    port: PORT,
  },
}

module.exports = merge(webpackConfigBase, webpackConfigDev)
