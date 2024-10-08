const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

/**
 * @returns {import('webpack').Configuration}
 */
module.exports = (env, argv) => {
  process.env.NODE_ENV = argv.mode || "production";
  return {
    entry: "./src/index",
    output: {
      clean: true, // 清理输入文件夹
      filename: "index.js",
      path: path.resolve(__dirname, "dist"),
      publicPath: "./",
    },
    devtool: argv.mode === "development" ? "source-map" : false,
    devServer: {
      static: "./dist",
      devMiddleware: {
        writeToDisk: true,
      },
    },
    resolve: {
      // Add `.ts` and `.tsx` as a resolvable extension.
      extensions: [".ts", ".tsx", "..."],
      // Add support for TypeScripts fully qualified ESM imports.
      extensionAlias: {
        ".js": [".js", ".ts"],
        ".cjs": [".cjs", ".cts"],
        ".mjs": [".mjs", ".mts"],
      },
      alias: {
        "@": path.resolve(__dirname, "src"),
      },
    },
    plugins: [
      new HtmlWebpackPlugin({ title: "正在处理,请稍候..." }),
      new MiniCssExtractPlugin(),
    ],
    module: {
      rules: [
        {
          test: /\.(?:png|jpe?g|gif|webp|mp[34]|svg)$/i,
          type: "asset/resource",
          generator: {
            // [name], [file], [query], [fragment], [base], [path], [hash], [ext], [query]
            filename: ({ filename }) =>
              "static/" +
              (filename || "").replace(/^.*\./, "") +
              "/[name].[hash][ext][query]",
          },
          parser: {
            dataUrlCondition: {
              maxSize: 4 * 1024, // 4kb
            },
          },
        },
        {
          test: /\.[cm]?[tj]sx?$/,
          exclude: /node_modules/,
          use: [
            // babel
            "babel-loader",
          ],
        },
        {
          test: /(?<!\.modules)\.(?:s[ac]|c)ss$/i,
          use: [
            // 生成css文件
            MiniCssExtractPlugin.loader,
            "css-loader",
            "postcss-loader",
            "sass-loader",
          ],
        },
        {
          test: /\.modules\.(?:s[ac]|c)ss$/i,
          use: [
            // 生成css文件
            MiniCssExtractPlugin.loader,
            {
              loader: "css-loader",
              options: { esModule: false, modules: true },
            },
            "postcss-loader",
            "sass-loader",
          ],
        },
      ],
    },
  };
};
