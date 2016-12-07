let ExtractTextPlugin = require("extract-text-webpack-plugin");
let HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
  entry: './src/app/index.js',
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, './build')
  },
  module: {
    rules: [
      {
        test: /\.scss/,
        loader: ExtractTextPlugin.extract({
          fallbackLoader: 'style-loader',
          loader: ['css-loader', 'postcss-loader', 'sass-loader']
        })
      },
      {
        test: /\.ts$/,
        loader: 'awesome-typescript-loader'
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.scss']
  },
  plugins: [
    new ExtractTextPlugin("styles.css"),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'src/index.html'
    })
  ],
  devServer: {
    contentBase: path.join(__dirname, "build"),
    compress: true,
    port: 9000
  }
};
