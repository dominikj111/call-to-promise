const path = require('path');
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
  entry: './indexBrowser.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'c2p.min.js',
  },
  plugins: [new CleanWebpackPlugin()],
};
