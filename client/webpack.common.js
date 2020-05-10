const CaseSensitivePathsPlugin = require("case-sensitive-paths-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebPackPlugin = require("html-webpack-plugin");
const ManifestPlugin = require("webpack-manifest-plugin");
const webpack = require('webpack');
const dotenv = require('dotenv');
const fs = require('fs');
const path = require('path');

function getEnvionmentVariableKeys(env) {
    // Determin which .env file to use for environment variables
    const currentPath = path.join(__dirname);
    const basePath = currentPath + '/.env';
    const envPath = basePath + '.' + env.ENVIRONMENT;
    const finalPath = fs.existsSync(envPath) ? envPath : basePath;
  
    // call dotenv and it will return an Object with a parsed key 
    const envVars = dotenv.config({ path: finalPath }).parsed;
  
    // reduce it to a nice object, the same as before
    return Object.keys(envVars).reduce((prev, next) => {
      prev[`process.env.${next}`] = JSON.stringify(envVars[next]);
      return prev;
    }, {});
  }

module.exports = function(env) {
    const envKeys = getEnvionmentVariableKeys(env);

    return {
        entry: {
            app: './src/index.jsx',
        },
        output : {
            path : path.resolve(__dirname, 'dist'),
            filename: '[name].bundle.js'
        },
        module : {
            rules : [
                {
                    test : /\.(js|jsx)$/,
                    exclude: /node_modules/,
                    use:'babel-loader'
                },
                {
                    test : /\.css$/,
                    exclude: /node_modules/,
                    use:[
                        {
                            loader: MiniCssExtractPlugin.loader
                        }, 
                        'css-loader'
                    ]
                },
                {
                    test: /\.scss$/,
                    use: [
                        MiniCssExtractPlugin.loader,
                        {
                            loader: "css-loader",
                            options: {
                                modules: {
                                    localIdentName: "[local]-[hash:base64:5]",
                                },
                                importLoaders: 1,
                            },
                        },
                        "sass-loader",
                    ],
                },
                {
                    test: /\.less$/,
                    use: [
                        {
                            loader: "style-loader",
                        },
                        {
                            loader: "css-loader",
                        },
                        {
                            loader: "less-loader",
                            options: {
                                modifyVars: {
                                    "primary-color": "#05EC7A",
                                    "link-color": "#05EC7A"
                                },
                                javascriptEnabled: true,
                            },
                        },
                    ],
                },
                {
                    test: /\.(png|svg|jpe?g|gif)$/i,
                    use: [
                        'file-loader',
                    ],
                }
            ]
        },
        plugins : [
            new CleanWebpackPlugin(),
            new HtmlWebPackPlugin({
                template : './public/index.html',
                favicon: './public/images/favicon-16x16.png'
            }),
            new CaseSensitivePathsPlugin(),
            new ManifestPlugin(),
            new webpack.DefinePlugin(envKeys)
        ],
        resolve: {
            extensions: [".js", ".jsx", ".css", ".scss", ".less"]
        }
    }
}