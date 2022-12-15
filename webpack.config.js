const path = require('path');
const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const EslingPlugin = require('eslint-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const baseConfig = {
    entry: path.resolve(__dirname, './src/index'),
    mode: 'development',
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: ['style-loader', 'css-loader', 'sass-loader']
            },
            { 
                test: /\.ts$/i, use: 'ts-loader' 
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif|ico|mp3)$/i,
                type: 'asset/resource',
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/i,
                type: 'asset/resource',
            },
        ],
    },
    resolve: {
        extensions: ['.ts', '.js'],
    },
    output: {
        filename: 'index.js',
        path: path.resolve(__dirname, './dist'),
        assetModuleFilename: "assets/images/[name][ext]",
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, './src/index.html'),
            filename: 'index.html',
        }),
        new CopyWebpackPlugin({
          patterns: [
            {from: path.resolve(__dirname, './src/public/favicon.ico'),
            to: path.resolve(__dirname, './dist')},            
            {from: path.resolve(__dirname, './src/public/rslogo.svg'),
            to: path.resolve(__dirname, './dist/assets')},            
            {from: path.resolve(__dirname, './src/public/store-logo.png'),
            to: path.resolve(__dirname, './dist/assets')},            
          ], 
        }),
        new CleanWebpackPlugin(),
        new EslingPlugin({ extensions: 'ts' })
    ],
};

module.exports = ({ mode }) => {
    const isProductionMode = mode === 'prod';
    const envConfig = isProductionMode ? require('./webpack.prod.config') : require('./webpack.dev.config');

    return merge(baseConfig, envConfig);
};
