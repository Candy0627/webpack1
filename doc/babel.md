## babel

### 进行的转换：

- 语法转换 
- 功能填充 api


### 使用

- plugins
  - 针对每个功能特性以及语法进行的编译操作


- presets
  - 一组针对代码功能特性，语法进行的编译操作


### 兼容问题

- babel-ployfill
- babel-runtime
  - 问题
      - 不会模拟实例方法  （例如：'jmz'.padStart(4)）


## 问题

- Requires Babel "^7.0.0-0", but was loaded with 
  - npm i babel-core@7.0.0-bridge.0
  - npm install babel-loader@next