const webpack = require('webpack');
const path=require('path');

module.exports = {
  entry: {
    vendor: ['lodash','jquery']
  },
  output: {
    path: path.resolve('./outputFile/'),
    filename: 'js/[name].js',
    library: '[name]_[hash]'               // 必填项，将此dll包暴露到window上，给app.js调用
  },
  plugins: [
    new webpack.DllPlugin({
      context: __dirname,                // 必填项，用来标志manifest中的路径
      path: path.resolve('[name].manifest.json'),    // 必填项，存放manifest的路径
      name: '[name]_[hash]'                     // 必填项，manifest的name
    }) 
  ]
};