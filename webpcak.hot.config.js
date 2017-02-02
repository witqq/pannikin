var path = require("path");
var webpack = require("webpack");
var WebpackNotifierPlugin = require("webpack-notifier");

module.exports = {
    entry: [
        "react-hot-loader/patch",
        "webpack-dev-server/client?http://localhost:3000",
        "webpack/hot/only-dev-server",
        "./src/index.tsx"
    ],

    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, "dist"),
        publicPath: "/dist/"
    },

    devtool: "eval",
    resolve: {
        // Add `.ts` and `.tsx` as a resolvable extension.
        extensions: [".webpack.js", ".web.js", ".ts", ".tsx", ".js"]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin(),
        new WebpackNotifierPlugin({alwaysNotify: true}),
        new webpack.NoEmitOnErrorsPlugin()
    ],
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: [
                    "babel-loader",
                    "awesome-typescript-loader"
                ],
                exclude: path.resolve(__dirname, "node_modules"),
                include: path.resolve(__dirname, "src")
            },
            {test: /\.css$/, loader: "style!css"},
            {test: /\.less$/, loader: "style-loader!css-loader!less-loader"},
            {test: /\.otf(\?[a-z0-9]+)?$/, loader: "url-loader?limit=10000&countryCode=[countryCode]-[hash].[ext]"},
            {test: /\.woff(\?.+)?$/, loader: "url-loader?limit=10000&mimetype=application/font-woff"},
            {test: /\.woff2(\?.+)?$/, loader: "url-loader?limit=10000&mimetype=application/font-woff2"},
            {test: /\.ttf(\?.+)?$/, loader: "url-loader?limit=10000&mimetype=application/octet-stream"},
            {test: /\.eot(\?.+)?$/, loader: "file-loader"},
            {test: /\.(svg|jpe?g|png|gif)(\?.+)?$/, loader: "file-loader"},
            {test: /\.cur(\?.+)?$/, loader: "file-loader"}]
    },


    devServer: {
        host: "localhost",
        port: 3000,
        historyApiFallback: true,
        hot: true
    }
};