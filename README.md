# 基于webpack的多页面脚手架
这个完全基于webpack4的配置，适用于一些官网产品类介绍的静态网页。

### 配置功能
- css压缩,js压缩,less编译

- 动态设置HtmlWebpackPlugin实现多页打包配置

- 启动webpack-dev-server（自动刷新）

### 动态实现方法
多入口管理文件：src/package.json
```js
[
    {
        "url": "index",
        "title": "首页"
    },
    {
        "url": "list",
        "title": "列表页"
    }
]
```  
webpack 配置根据这个多入口管理文件来生成 html 页面，不需要手动写多少个entry与new HtmlWebpackPlugin，这个解决了工作中遇到重复工作的问题。
### 注意：
- 在 webpack的entry配置上，设置为src/views/${page.url}/index.js，其实page变量是根据package.json来实现。

- 创建：任何页面这个路径必须是 src/views/页面名/index.js，同时 在package.json也要加上对应的url值，title值可空。


### 本项目使用包管理工具NPM，因此需要先把本项目所依赖的包下载下来：
```js
$ npm install
```  

### 启动服务器
```js
npm run dev
http://localhost:8080
```  
理论上来说，webpack-dev-server会自动帮你打开浏览器并展示示例页面；如果没有的话，请手动打开浏览器，在地址栏里输入
http://localhost:8080，Duang！页面就出来了！

### 打包
```js
npm run build
```  
### 总结
使用 webpack 构建多页面的几个核心问题，虽然就是运用了 webpack 的多入口打包以及自动生成 HTML 的一个插件，但其中的缘由还是需要我们了解的。


