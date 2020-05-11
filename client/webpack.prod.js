const common = require("./webpack.common.js");
const merge = require("webpack-merge");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserPlugin = require('terser-webpack-plugin');

module.exports = function(env) {
    return merge(common(env), {
        mode: "production",
        plugins: [
            new MiniCssExtractPlugin({
                filename: "[name].[contenthash].css",
                chunkFilename: '[id].[contenthash].css'
            })
        ],
        optimization: {
            minimize: true,
            minimizer: [new TerserPlugin()],
        }
    });
};
