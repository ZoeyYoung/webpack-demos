var webpack = require("webpack");
var path = require("path");
var HtmlWebpackPlugin = require("html-webpack-plugin");
const build = path.join(__dirname, 'build');

module.exports = {
    entry: {
      "vendor": ["jquery", "bootstrap", "./entry/vendor"],
      "index": "./entry/index.js",
      "index-1": "./entry/index-1.js",
      "index-2": "./entry/index-2.js"
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
            template: "pages/index.html",
            chunks: ['vendor', 'index'],
        }),
        new HtmlWebpackPlugin({
            filename: "index-1.html",
            template: "pages/index-1.html",
            chunks: ['vendor', 'index-1'],
        }),
        new HtmlWebpackPlugin({
            filename: "index-2.html",
            template: "pages/index-2.html",
            chunks: ['vendor', 'index-2']
        })
    ]
};
