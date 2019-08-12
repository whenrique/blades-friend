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
        use: ['babel-loader', 'eslint-loader']
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
      template: './views/signin.html',
      filename: 'signin.html',
      meta: {
        charset: 'UTF-8',
        viewport: 'width=device-width, initial-scale=1.0',
      }
    }),
    new HtmlWebpackPlugin({
      template: './views/signed.html',
      filename: 'signed.html',
      meta: {
        charset: 'UTF-8',
        viewport: 'width=device-width, initial-scale=1.0',
      }
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css',
    }),
  ],
  resolve: {
    extensions: ['*', '.js', '.html', '.scss'],
    alias: {
      style: path.resolve(__dirname, 'styles/')
    }
  },
  watch: true,
  /* devServer: {
    contentBase: './public',
    host: '0.0.0.0',
    port: 3000
  } */
}
