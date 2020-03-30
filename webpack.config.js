const SWPrecacheWebpackPlugin = require("sw-precache-webpack-plugin");
const WebpackPwaManifest = require("webpack-pwa-manifest");

const config = {
  entry: {
    app: "./public/assets/js/app.js",
    chart: "./public/assets/js/expenseChart.js"
  },
  output: {
    path: __dirname + "/public/dist",
    filename: "[name].bundle.js"
  },
  plugins: [
    new SWPrecacheWebpackPlugin({
      cacheId: "my-domain-cache-id",
      dontCacheBustUrlsMatching: /\.\w{8}\./,
      filename: "service-worker.js",
      minify: true,
      staticFileGlobsIgnorePatterns: [/\.map$/, /manifest\.json$/]
    }),
    new WebpackPwaManifest({
      name: "Offline Budget Tracker",
      short_name: "Budget Tracker",
      icons: [],
      theme_color: "#ffffff",
      background_color: "#ffffff",
      start_url: "/"
    })
     
  ],

  mode: "development",
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"]
          }
        }
      }
    ]
  }
};
module.exports = config;
