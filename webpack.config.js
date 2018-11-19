const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const Html = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack');
const path = require('path');
const PurifyCssWebpack = require('purifycss-webpack');
const glob = require('glob');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

// 命令行中可能会输入空格
let NODE_ENV = process.env.NODE_ENV.trim();

module.exports = {
  mode: NODE_ENV === 'dev' ? 'development' : 'production',
  // devtool: 'source-map',
  entry: {
    index: ['./js/index.js'],
    index1: './js/index1.js',
    common: ['jquery']
  },
  output: {
    path: path.join(__dirname, 'outputFile'),
    publicPath: NODE_ENV === 'dev' ? '/' : 'http://dqr.com',
    chunkFilename:'js/[name].[chunkhash].js',
    filename: 'js/[name].js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: '/node_modules/',
        use: [
          'babel-loader',
          'eslint-loader'
        ]
      },
      {
        test: /\.tsx?$/,
        exclude: '/node_modules/',
        use: [
          'ts-loader',
          {
            loader: 'tslint-loader',
            options: {
              configuration: {
                rules: {
                  quotemark: [true, 'double']
                }
              }
            }
          }
        ]
      },
      {
        test: /\.css$/,
        exclude: '/node_modules/',
        use: [
          {
            loader: MiniCssExtractPlugin.loader
          },
          'css-loader',
          'postcss-loader'
        ]
      },
      {
        test: /\.(png|jpg|svg|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 1,
              outputPath: 'images'  // 相对输出路径
            }
          }
        ]
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
            options: {
              attrs: ['img:src'],
              minimize: NODE_ENV === 'dev' ? false : true
            }
          }
        ]
      }
    ]
  },
  plugins: [
    // new BundleAnalyzerPlugin(),  // 

    new webpack.HotModuleReplacementPlugin(),
    new CleanWebpackPlugin(['./outputFile']),
    new MiniCssExtractPlugin({
      filename: "css/[name].css"
    }),
    new Html({
      template: 'html/index.html',
      filename: 'html/index.html'
      // chunks: ['common','index']  //页面包含的的js文件
    })
  ],
  resolve: {
    extensions: ['.ts', '.tsx', '.js']
  },
  /**
   * 优化部分包括代码拆分
   * 且运行时（manifest）的代码拆分提取为了独立的 runtimeChunk 配置 
   */
  // optimization: {
  //   splitChunks: {
  //     chunks: "all",
  //     cacheGroups: {
  //       // 提取 node_modules 中代码
  //       vendors: {
  //         test: /[\\/]node_modules[\\/]/,
  //         name: "vendors",
  //         chunks: "all"
  //       },
  //       commons: {
  //         // async 设置提取异步代码中的公用代码
  //         chunks: "async",
  //         name: 'commons-async',
  //         /**
  //          * minSize 默认为 30000
  //          * 想要使代码拆分真的按照我们的设置来
  //          * 需要减小 minSize
  //          */
  //         minSize: 0,
  //         // 至少为两个 chunks 的公用代码
  //         minChunks: 2,
  //       }
  //     }
  //   },
  //   /**
  //    * 对应原来的 minchunks: Infinity
  //    * 提取 webpack 运行时代码
  //    * 直接置为 true 或设置 name
  //    */
  //   runtimeChunk: {
  //     name: 'manifest'
  //   }
  // },
  // 配置本地服务器
  devServer: {
    contentBase: './outputFile',
    compress: true,
    host: '192.168.2.162',
    port: 4200,
    hot: true,
    historyApiFallback: true
  }
};