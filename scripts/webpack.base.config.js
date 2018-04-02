
const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

function resolve(relatedPath) {
  return path.join(__dirname, relatedPath)
}

const webpackConfigBase = {
  entry: {
    client: resolve('../app/client.js'),
  },
  output: {
    path: resolve('../dist'),
    filename: '[name].[hash:4].js',
    chunkFilename: 'chunks/[name].[hash:4].js',
  },
  resolve: {
    extensions: ['.js', '.json'],
    alias: {
      components: path.join(__dirname, '/../app/components'),
      actions: path.join(__dirname, '/../app/actions'),
      api: path.join(__dirname, '/../app/api'),
      reducers: path.join(__dirname, '/../app/reducers'),
      utils: path.join(__dirname, '/../app/utils'),
      controllers: path.join(__dirname, '/../app/controllers'),
      style: path.join(__dirname, '/../app/style'),
      img: path.join(__dirname, '/../app/images'),
    },
  },
  resolveLoader: {
    moduleExtensions: ['-loader']
  },
  module: {
    rules: [
      {
        test: /\.js[x]?$/,
        exclude: /node_modules/,
        loader: 'babel',
      },
      { 
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader' 
      },
      { test: /\.css$/, loader: 'style-loader!css-loader' },
      {
        test: /\.less$/,
        loader: ExtractTextPlugin.extract({
          fallback: 'style',
          use: [
            { loader: 'css', options: { sourceMap: true } },
            { loader: 'less', options: { sourceMap: true } }
          ]
        }),
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url',
        options: {
          limit: 8192,
          name: 'img/[name].[hash:4].[ext]'
        }
      },
      { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: "file" },
      { test: /\.(woff|woff2)$/, loader:"url?prefix=font/&limit=5000" },
      { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=application/octet-stream" },
      { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=image/svg+xml" }
    ],
  },
  plugins: [
    // 提取css
    new ExtractTextPlugin('style.[hash:4].css'),
    // 将打包后的资源注入到html文件内    
    new HtmlWebpackPlugin({
      template: resolve('../app/index.html'),
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'client', // 入口文件名
      filename: 'common.bundle.js', // 打包后的文件名
      minChunks: function (module, count) {
        return module.resource &&
          /\.js$/.test(module.resource) &&
          module.resource.indexOf(resolve('../node_modules')) === 0
      }
    }),
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery"
    }),
    new webpack.optimize.CommonsChunkPlugin({
      async: 'async-common',
      minChunks: 3,
    }),
  ]
}

module.exports = webpackConfigBase
