var webpack = require("webpack");
var path = require("path");
var HtmlWebpackPlugin = require("html-webpack-plugin");
const build = path.join(__dirname, 'build');

module.exports = {
    entry: {
      "vendor": ["jquery", "bootstrap", __dirname + "/pages/app"],
      "index": __dirname + "/pages/index/index.js",
      "index-1": __dirname + "/pages/page1/index-1.js",
      "index-2": __dirname + "/pages/page2/index-2.js"
    },
    output: {
        path: path.join(build),
        filename: "[name]-[hash].js"
    },
    module: {
        loaders: [{
            test: /\.css$/,
            loader: "style!css"
        }, {
            test: /\.scss$/,
            loader: "style!css!sass"
        }, {
            test: /\.(png|jpg)$/,
            loader: "file?name=img/[name]-[hash].[ext]"
        }, {
            test: /\.html$/,
            loader: "html"
        }, {
          test: /\.(woff|woff2|eot|ttf|svg)(\?.*$|$)/,
          loader: 'url-loader?importLoaders=1&limit=1000&name=/fonts/[name].[ext]'
        }]
    },
    resolve: {
      extensions: ['', '.js'],
    },
    plugins: [
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            "Tether": 'tether',
            "window.Tether": "tether"
        }),
        new webpack.optimize.CommonsChunkPlugin({
          names: ["vendor"],
          minChunks: Infinity
        }),
        new HtmlWebpackPlugin({
            filename: "index.html",
            template: "pages/index/index.html",
            chunks: ['vendor', 'index'],
        }),
        new HtmlWebpackPlugin({
            filename: "index-1.html",
            template: "pages/page1/index-1.html",
            chunks: ['vendor', 'index-1'],
        }),
        new HtmlWebpackPlugin({
            filename: "index-2.html",
            template: "pages/page2/index-2.html",
            chunks: ['vendor', 'index-2']
        })
    ]
};
