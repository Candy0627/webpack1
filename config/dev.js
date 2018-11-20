const webpack=require('webpack');
module.exports = function (config) {
  config.devtool = 'source-map';
  config.plugins.push(new webpack.HotModuleReplacementPlugin());
  config.devServer = {
    contentBase: './outputFile',
    host: '127.0.0.1',
    port: 4200,
    hot: true,
    historyApiFallback: true,
    open: true
  }
}