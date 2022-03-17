const webpack = require("webpack");
const path = require('path');
const copy = require('copy-webpack-plugin')

const mode = process.env.WEBPACK_ENV || 'development';

module.exports = {
    mode: mode,
    entry: {
        content_script: path.join(__dirname, './src/content_script.ts'),
    },
    output: {
        path: path.join(__dirname, './dist'),
        filename: '[name].js'
    },
    optimization: {
        splitChunks: {
            name: 'vendor',
            chunks: "initial"
        }
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            }
        ]
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js']
    },
};
