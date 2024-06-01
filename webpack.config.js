const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = (env, argv) => {
  return {
    entry: "./src/index.ts",
    output: {
      clean: true, // 清理输入文件夹
      filename: "index.js",
      path: path.resolve(__dirname, "dist"),
    },
    devtool: argv.mode === "development" ? "source-map" : false,
    devServer: {
      static: "./dist",
    },
    resolve: {
      // Add `.ts` and `.tsx` as a resolvable extension.
      extensions: [".ts", ".tsx", ".js"],
      // Add support for TypeScripts fully qualified ESM imports.
      extensionAlias: {
        ".js": [".js", ".ts"],
        ".cjs": [".cjs", ".cts"],
        ".mjs": [".mjs", ".mts"],
      },
    },
    plugins: [
      new HtmlWebpackPlugin({ title: "正在处理,请稍候..." }),
      new MiniCssExtractPlugin(),
    ],
    module: {
      rules: [
        {
          test: /\.[cm]?[tj]sx?$/,
          exclude: /node_modules/,
          use: [
            // babel
            "babel-loader",
            "ts-loader",
          ],
        },
        {
          test: /\.(?:s[ac]|c)ss$/i,
          use: [
            // 生成css文件
            MiniCssExtractPlugin.loader,
            "css-loader",
            "postcss-loader",
            "sass-loader",
          ],
        },
      ],
    },
  };
};
