/* eslint-disable no-unused-vars */
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
  entry: './scripts/index.js',
  output: {
    path: path.resolve(__dirname, '../public'),
    filename: 'app.js'
  },
  module: {
    rules: [
      {
        test: /\.js/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          'css-loader',
          // 'postcss-loader',
          'sass-loader'
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './views/index.html',
      meta: {
        charset: 'UTF-8',
        viewport: 'width=device-width, initial-scale=1.0',
        favicon: 'http://d1ujqdpfgkvqfi.cloudfront.net/favicon-generator/htdocs/favicons/2019-04-07/8a6a78cbb60dc3bc956b891462d29758.ico',
      }
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css',
    }),
  ],
  resolve: {
    extensions: ['*', '.js', '.html', '.scss']
  },
  mode: 'development',
  devServer: {
    contentBase: './public',
    host: '0.0.0.0',
    port: 9000
  }
}
