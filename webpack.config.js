var path = require("path");
module.exports = {
  entry: [path.join(__dirname, "browser.js")],
  output: {
    path: path.resolve(__dirname, 'public'),
    publicPath: '/',
    filename: 'main.js'
  },
  resolve: {
    fallback: { path: require.resolve("path-browserify") }
  }
};
