const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  entry: "./src/main.tsx",
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        loader: "ts-loader",
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "index.html",
    }),
    new CopyPlugin({
      patterns: [
        {
          from: "node_modules/@novorender/api/public/*",
          to: "novorender/api/[name][ext]",
        },
      ],
    }),
  ],
  devServer: {
    headers: {
      "Cross-Origin-Opener-Policy": "same-origin",
      "Cross-Origin-Embedder-Policy": "require-corp",
    },
    client: {
      overlay: {
        warnings: false,
        errors: false,
      },
    },
  },
};
