var path = require("path");
module.exports = {
  entry: [path.join(__dirname, "browser.js")],
  output: {
    path: __dirname,
    filename: 'public/main.js'
  },
  resolve: {
    fallback: { path: require.resolve("path-browserify") }
  }
};
