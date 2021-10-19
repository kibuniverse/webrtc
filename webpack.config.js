const path = require('path');
const webpack = require('webpack');

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.js'
  },
  devServer: { 
    hot: true,
    open: true,
    proxy: {}, // 代理
    client: {
      progress: true,
    },
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ]
};