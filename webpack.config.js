

const Html = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');

const path = require('path');
const fs = require('fs');

let NODE_ENV = !process.env.NODE_ENV ? 'dev' : process.env.NODE_ENV.trim();

/** 
 * 获取入口
 * 获取html模板
 * 获取拷贝文件  
 */ 
const dirs = fs.readdirSync('./src');
const entery = {};
const htmls = [];
const imgs = [];

dirs.forEach((el, index) => {

  entery[el] = `./src/${el}/js/${el}.js`;

  htmls.push(new Html({
    template: `./src/${el}/html/${el}.html`,
    filename: `${el}/html/${el}.html`,
    chunks: [el]
  }));

  imgs.push(new CopyWebpackPlugin([{
    from: `./src/${el}/img`,
    to: `${el}/images`
  },{
    from: `./src/${el}/doc`,
    to: `${el}/doc`
  }]));

});

const config = {
  mode: 'development',
  entry: entery,
  output: {
    path: path.join(__dirname, './outputFile/'),
    filename: '[name]/js/[name].[hash:8].js'
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
          'tslint-loader'
        ]
      },
      {
        test: /\.css$/,
        exclude: '/node_modules/',
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader'
        ]
      },
      {
        test: /\.less$/,
        exclude: '/node_modules/',
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'less-loader'
        ]
      },
      {
        test: /\.html$/,
        exclude: '/node_modules/',
        use: [
          {
            loader: 'html-loader'
          }
        ]
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(['./outputFile']),
    new MiniCssExtractPlugin({
      filename: "[name]/css/[name].css"
    })
  ].concat(htmls,imgs),
  resolve: {
    extensions: ['.ts', '.tsx', '.js']
  },
  // 优化部分包括代码拆分
  optimization: {
    splitChunks: {
      chunks: 'async',
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true
        }
      }
    }
  }
};


if(NODE_ENV==='dev'){
  require('./config/dev')(config);
}

if(NODE_ENV==='prod'){
   require('./config/prod')(config);
}

if (NODE_ENV === 'analyer') {
  require('./config/analyer')(config);
}

if (NODE_ENV === 'build') {
  require('./config/build')(config);
}

module.exports=config;