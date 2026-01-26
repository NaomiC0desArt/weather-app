const { merge } = require("webpack-merge");
const common = require("./webpack.common.js"); // Importa la base

module.exports = merge(common, {
  mode: "development",
  devtool: "eval-source-map",
  devServer: {
    static: "./dist", //dónde está el contenido base
    watchFiles: ["./src/**/*.html"],
  },
});
