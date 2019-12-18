# H5 包开发说明

## 目录说明

1. /build
   webpack 构建配置目录
   webpack.dll.js 构建公共包配置文件
   webpack.common.js 开发环境和生成环境配置的基础配置文件
   webpack.dev.js 开发环境配置文件（基于 webpack.common.js）
   webpack.prod.js 生产环境配置文件（基于 webpack.common.js）

2. /public
   index.html webpack 配置的 HTML 模板

3. /common
   所有项目的公共静态资源文件，包括图片，重置样式等

4. /www
   打包后的文件存放目录
   /www/common 公共包打包文件
   /www/page html 入口存放点
   /www/index.html html 入口存放点
   /www/static 静态资源目录
   /www/zip H5 压缩包存放点

5. /src
   项目工程列表目录，存放同时开发的多个工程目录
   /src/comm 公用组件目录
   /src/containers 外容器，主路由及主要页面布局配置
   /src/pages 各个模块下页面结构目录
   /src/static 静态资源目录：样式图片等
   /src/store mobx 状态管理目录
   /src/util 基础工具类目录
   /src/index.js 入口文件

6. 项目基础配置文件
   /package.json 项目配置文件
   /.babelrc Babel 配置文件
   /.editorconfig EditorConfig 配置文件
   /.eslintrc.json Eslint 配置文件
   /yarn.lcok yarn 加载 npm 模块锁定日志

---

## 本地调试

1. 安装依赖包（已经安装可以忽略）:yarn(推荐) 或者 npm install
2. 构建公共包 yarn build:dll 或者 npm run build:dll
   生成 /www/common 公共包打包文件
3. 运行开发环境 yarn start 或者 npm run start

## 本地代码打包结果测试

查看本地开发环境打包后的代码：yarn build 或者 npm run build
