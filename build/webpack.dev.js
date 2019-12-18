/**
 * Created by xiao on 2019/3/30.
 */
const webpack = require("webpack");
const merge = require("webpack-merge");
const commonConfig = require("./webpack.common");

const devConfig = {
  mode: "development",
  devtool: "cheap-module-eval-source-map",
  output: {
    chunkFilename: "static/js/[name].chunk.[contenthash].js",
    filename: "static/js/[name].[hash:8].js",
  },
  module: {
    rules: [
      {
        test: /\.less$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              importLoaders: 2,
            },
          },
          {
            loader: "postcss-loader",
            options: {
              plugins: [
                require("autoprefixer"),
                require("postcss-pxtorem")({
                  rootValue: 108,
                  propWhiteList: [],
                  minPixelValue: 2,
                }),
              ],
            },
          },
          "less-loader",
        ],
      },
      {
        test: /\.css$/,
        include: /node_modules/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              importLoaders: 1,
            },
          },
          {
            loader: "postcss-loader",
            options: {
              plugins: [require("autoprefixer")],
            },
          },
        ],
      },
    ],
  },
  devServer: {
    host: "localhost",
    contentBase: "./www",
    historyApiFallback: true,
    open: true,
    port: 8082,
    hot: true, // 开启hmr功能
    proxy: {},
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
  ],
};

module.exports = merge(commonConfig, devConfig);
