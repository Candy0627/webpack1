const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports=function(config){
  config.plugins.push(new BundleAnalyzerPlugin());
}