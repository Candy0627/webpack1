// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;


const Html = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack');
const path = require('path');
const PurifyCssWebpack = require('purifycss-webpack');
const glob = require('glob');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  mode: 'development',
  // devtool: 'source-map',
  entry: {
    index: './index.js',
    index1: './index1.js',
    vendor2: ['jquery']
  },
  output: {
    path: path.join(__dirname, 'outputFile'),
    filename: '[name].[hash].js',
    chunkFilename: '[name].[hash].js'
  },
  module: {
    rules: [
      { test: /\.js|\.jsx/, exclude: '/node_modules/', loader: 'babel-loader' },
      {
        test: /\.css$/, exclude: '/node_modules/', use: [{
          loader: MiniCssExtractPlugin.loader,
          options: {
            publicPath: './'  // 相对输出路径
          }
        }, 'css-loader', 'postcss-loader']
      },
      {
        test: /\.(png|jpg|svg|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 1000,
              outputPath:'images'  // 相对输出路径
            }
          }
        ]
      }
    ]
  },
  plugins: [
    // new BundleAnalyzerPlugin(),

    new webpack.HotModuleReplacementPlugin(),
    new CleanWebpackPlugin(['./outputFile']),
    new MiniCssExtractPlugin({
      filename: "css/[name].css"
    }),
    new Html({
      template: './index.html',
      filename: 'index.html',
      chuncks: ['vendor2', 'index']
    }),
    new PurifyCssWebpack({
      paths: glob.sync(path.join(__dirname, '*.html')) // 同步扫描所有html文件中所引用的css
    })
  ],
  /**
 * 优化部分包括代码拆分
 * 且运行时（manifest）的代码拆分提取为了独立的 runtimeChunk 配置 
 */
  optimization: {
    splitChunks: {
      chunks: "all",
      cacheGroups: {
        // 提取 node_modules 中代码
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendors",
          chunks: "all"
        },
        commons: {
          // async 设置提取异步代码中的公用代码
          chunks: "async",
          name: 'commons-async',
          /**
           * minSize 默认为 30000
           * 想要使代码拆分真的按照我们的设置来
           * 需要减小 minSize
           */
          minSize: 0,
          // 至少为两个 chunks 的公用代码
          minChunks: 2
        }
      }
    },
    /**
     * 对应原来的 minchunks: Infinity
     * 提取 webpack 运行时代码
     * 直接置为 true 或设置 name
     */
    runtimeChunk: {
      name: 'manifest'
    }
  },
  // 配置本地服务器
  devServer: {
    contentBase: './outputFile',
    port: 4200,
    // inline: true,
    hot: true,
    historyApiFallback: true
  }
};