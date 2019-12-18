/**
 * @author Lcp
 */
const merge = require("webpack-merge");
const commonConfig = require("./webpack.common");
const TerserPlugin = require("terser-webpack-plugin");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
  .BundleAnalyzerPlugin;
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const ExtractTextWebpackPlugin = require("extract-text-webpack-plugin");
const ZipPlugin = require("zip-webpack-plugin");

const prodConfig = {
  // 打包的模式，默认就是production，还可以配置为development则代码不会被压缩
  mode: "production",
  devtool: "source-map", // 生产环境
  output: {
    chunkFilename: "static/js/[name].chunk.[contenthash].js",
    filename: "static/js/[name].[hash:8].js",
  },
  performance: {
    //配置构建包大小超出界限时报错
    hints: "warning"
    // maxEntrypointSize: 400000,
    // maxAssetSize: 400000
  },
  optimization: {
    runtimeChunk: {
      name: "runtime",
    },
    splitChunks: {
      chunks: "all",
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
          name: "vendors",
        },
      },
    },
    minimizer: [
      new TerserPlugin(),
      new OptimizeCSSAssetsPlugin({
        assetNameRegExp: /\.css\.*(?!.*map)/g,
      }),
    ],
    usedExports: true,
  },
  module: {
    rules: [
      {
        test: /\.less$/,
        use: ExtractTextWebpackPlugin.extract({
          fallback: "style-loader",
          publicPath: "../../",
          use: [
            {
              loader: "css-loader",
              options: {},
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
            {
              loader: "less-loader",
            },
          ],
        }),
      },
      {
        test: /\.css$/,
        include: /node_modules/,
        use: ExtractTextWebpackPlugin.extract({
          fallback: "style-loader",
          use: [
            {
              loader: "css-loader",
              options: {},
            },
            {
              loader: "postcss-loader",
              options: {
                plugins: [require("autoprefixer")],
              },
            },
          ],
        }),
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin({
      dry: false,
      dangerouslyAllowCleanPatternsOutsideProject: true,
      cleanOnceBeforeBuildPatterns: [
        "static/**",
        "page/**",
        "zip/**",
        "index.html",
      ],
    }),
    new ExtractTextWebpackPlugin({
      filename: "static/css/[name].[hash].css",
      allChunks: true,
    }),
    new ZipPlugin({
      path: "zip",
      filename: "h5.zip",
      extension: "zix",
      pathPrefix: "", //relative/path
      fileOptions: {
        mtime: new Date(),
        mode: 0o100664,
        compress: true,
        forceZip64Format: false,
      },
      zipOptions: {
        forceZip64Format: false,
      },
    }),
  ],
};

module.exports = merge(commonConfig, prodConfig);
