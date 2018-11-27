var path = require("path");
var CleanWebpackPlugin = require("clean-webpack-plugin");
var HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: {
    app: "./src/index.js"
  },
  output: {
    filename: "[name].[chunkhash].js",
    path: path.resolve(__dirname, "assets"),
    chunkFilename: '[name].bundle.js',
    // publicPath: 'http://www.time4education.com/moodle/aimcatsolutions/'
  },
  // devServer: {
  //   contentBase: path.join(__dirname, 'assets'),
  //   compress: true,
  //   port: process.env.PORT || 9000
  // },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loaders: ["babel-loader"]
      },
      {
        test: /\.css$/,
        loaders: ["style-loader", "css-loader"]
      }
    ]
  },
  plugins: [new CleanWebpackPlugin(["assets"]), new HtmlWebpackPlugin()],
  mode: "production"
};
