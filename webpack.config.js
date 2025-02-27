'use strict';

import path from 'path';
import autoprefixer from 'autoprefixer';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';

export default {
    mode: 'development',
    entry: './src/client/index.js',
    output: {
        filename: 'index.js',
        path: path.resolve(process.cwd(), 'dist'),
        assetModuleFilename: 'images/[name][ext]'
    },
    devServer: {
        static: path.resolve(process.cwd(), 'dist'),
        port: 8080,
        hot: true, 
        liveReload: true 
    },
    plugins: [
        //new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({ template: './src/client/views/index.html' })
    ],
    module: {
        rules: [
            {
                test: /\.(scss)$/,
                use: [
                    'style-loader',
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            postcssOptions: {
                                plugins: [autoprefixer]
                            }
                        }
                    },
                    'sass-loader'
                ]
            },
            {
                test: /\.(png|jpe?g|gif|svg|webp)$/i,
                type: 'asset/resource'
            },
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
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
