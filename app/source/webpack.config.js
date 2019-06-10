const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: './source/scripts/index.js',
  output: {
    path: path.resolve(__dirname, './public'),
    filename: 'app.js'
  },
  module: {
    rules: [
      {
        test: /\.js/,
        exclude: /node_modules/,
        use: ['babel-loader']
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './source/views/index.html',
      meta: {
        charset: 'UTF-8',
        viewport: 'width=device-width, initial-scale=1.0',
        favicon: 'http://d1ujqdpfgkvqfi.cloudfront.net/favicon-generator/htdocs/favicons/2019-04-07/8a6a78cbb60dc3bc956b891462d29758.ico',

      }
    })
  ],
  resolve: {
    extensions: ['*', '.js', '.html']
  },
  mode: 'development',
  devServer: {
    contentBase: './public',
    host: '0.0.0.0',
    port: 9000
  }
}
