// Generated using webpack-cli https://github.com/webpack/webpack-cli

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FaviconsBundlerPlugin = require('html-bundler-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const isProduction = process.env.NODE_ENV == 'production';


const stylesHandler = isProduction ? MiniCssExtractPlugin.loader : 'style-loader';



const config = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
    },
    devServer: {
        open: true,
        host: 'localhost',
        port: 5000,
        static: {
            directory: path.join(__dirname, '/src/'),
        },
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
        }),

        new FaviconsBundlerPlugin({
            enabled: 'auto', // true, false, auto - generate favicons in production mode only
            faviconOptions: {
            path: '/img/favicons', // output path
            appName: 'To Doodle!',
            icons: {
                android: true, // Create Android homescreen icon.
                appleIcon: true, // Create Apple touch icons.
                appleStartup: false, // Create Apple startup images.
                favicons: true, // Create regular favicons.
                windows: false, // Create Windows 8 tile icons.
                yandex: false, // Create Yandex browser icon.
            },
            },
        }),

        // Add your plugins here
        // Learn more about plugins from https://webpack.js.org/configuration/plugins/
    ],
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/i,
                loader: 'babel-loader',
            },
            {
                test: /\.css$/i,
                use: [stylesHandler,'css-loader'],
            },
            {
                test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
                type: 'asset',
            },

            // Add your rules for custom modules here
            // Learn more about loaders from https://webpack.js.org/loaders/
        ],
    },
};

module.exports = () => {
    if (isProduction) {
        config.mode = 'production';
        
        config.plugins.push(new MiniCssExtractPlugin());
        
        
    } else {
        config.mode = 'development';
    }
    return config;
};
