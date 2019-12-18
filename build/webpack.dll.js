/**
 * @author Lcp
 */
const path = require("path");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const ProgressBarPlugin = require("progress-bar-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
  mode: "production",
  target: "web",
  entry: {
    react: ["react"],
    reactDom: ["react-dom"],
    reactRouter: ["react-router"],
    reactRouterDom: ["react-router-dom"],
    mobx: ["mobx"],
    mobxReact: ["mobx-react"],
    dsbridge: "dsbridge",
    eruda: "./node_modules/eruda/eruda.min.js",
  },
  output: {
    path: path.resolve(__dirname, "../www"),
    filename: "common/js/[name].js",
    library: "[name]",
    libraryTarget: "var",
  },
  module: {
    unknownContextCritical: false,
  },
  performance: false,
  plugins: [
    // 打包前删除dll目录
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: ["common/js/*"],
    }),
    new CopyWebpackPlugin([{
      from: "common/js",
      to: "common/js"
    }], {
      ignore: [],
      copyUnmodified: true
    }),
    new ProgressBarPlugin(),
  ],
};