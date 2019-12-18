/**
 * @author Lcp
 */
const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ProgressBarPlugin = require("progress-bar-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

const commonConfig = {
  entry: {
    index: "./src/index.js"
  },
  output: {
    path: path.resolve(__dirname, "../www")
  },
  module: {
    unknownContextCritical: false,
    rules: [{
        test: /\.(jsx?|es6)$/,
        exclude: /node_modules/,
        use: [{
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env", "@babel/preset-react"],
              plugins: [
                "@babel/plugin-syntax-dynamic-import",
                [
                  "import",
                  {
                    libraryName: "antd-mobile",
                    style: "css"
                  }
                ],
                ["@babel/plugin-proposal-decorators", {
                  legacy: true
                }],
                ["@babel/plugin-proposal-class-properties", {
                  loose: true
                }],
                "@babel/plugin-transform-runtime"
              ]
            }
          }
          // "eslint-loader"
        ]
      },
      {
        test: /\.(jpg|png|gif|ico)$/,
        use: {
          loader: "url-loader",
          options: {
            name: "static/images/[name].[hash:8].[ext]",
            limit: 1
          }
        }
      },
      {
        test: /\.(eot|svg|ttf|woff)$/,
        use: {
          loader: "file-loader",
          options: {
            name: "static/fonts/[name].[ext]"
          }
        }
      }
    ]
  },
  plugins: [
    new ProgressBarPlugin(),
    new CopyWebpackPlugin([{
      from: "www/common",
      to: "common"
    }], {
      ignore: [],
      copyUnmodified: true
    }),
    new HtmlWebpackPlugin({
      filename: "page/index.html",
      template: "./public/index.html",
      publicPath: "../",
      minify: {
        minifyCSS: true,
        collapseWhitespace: true,
        collapseInlineTagWhitespace: true,
        removeRedundantAttributes: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true,
        removeEmptyAttributes: true,
        removeComments: true
      }
    }),
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: "./public/index.html",
      publicPath: "",
      minify: {
        minifyCSS: true,
        collapseWhitespace: true,
        collapseInlineTagWhitespace: true,
        removeRedundantAttributes: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true,
        removeEmptyAttributes: true,
        removeComments: true
      }
    })
  ],
  resolve: {
    extensions: [".js", ".jsx", ".es6"],
    alias: {
      COMMON: path.resolve(__dirname, "../common")
    }
  },
  externals: {
    "react-router": "reactRouter",
    "react-router-dom": "reactRouterDom",
    dsbridge: "dsbridge",
    eruda: "eruda"
  }
};

module.exports = commonConfig;