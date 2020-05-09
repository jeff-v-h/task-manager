const common = require("./webpack.common.js");
const merge = require("webpack-merge");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = function (env) {
    return merge(common(env), {
        mode: "development",
        devtool: "inline-source-map",
        devServer: {
            contentBase: './dist',
            compress: true,
            hot: true,
            historyApiFallback: true,
            port: 3000,
            host: '0.0.0.0'
        },
        plugins: [
            new MiniCssExtractPlugin({
                filename: "[name].css",
                chunkFilename: '[id].css'
            })
        ],
    });
};
