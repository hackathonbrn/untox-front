const path = require('path');
const webpack = require('webpack-stream').webpack;
const config = require('./gulp.config');
// const HtmlWebpackPlugin = require('html-webpack-plugin');
const isDevelopment = !process.env.NODE_ENV || process.env.NODE_ENV === 'development';
console.log('env is ' + (isDevelopment ? 'development' : 'production'));
const pluginsProd = [
    // new UglifyJSPlugin({
    //     sourceMap: false
    // }),
    // new webpack.optimize.OccurrenceOrderPlugin(true),
];
const pluginsDev = [];
const plugins = isDevelopment ? pluginsDev : pluginsProd;

module.exports = {
    mode: isDevelopment ? 'development' : 'production',
    watch: isDevelopment,
    target: 'web',
    entry: config.paths.entry,
    devtool: isDevelopment ? 'eval' : 'hidden-source-map', // settings source-map
    output: {
        publicPath: '/js/',
        path:  __dirname + '/../public/js/',
        filename: 'bundle.js'
    },
    devServer: {
        historyApiFallback: true,
    },
    plugins: [
        new webpack.DefinePlugin({
            API_URL: JSON.stringify(process.env.API_URL)
        }),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery'
        }),
        // new webpack.optimize.CommonsChunkPlugin({
        //     name: 'commons',
        //     filename: 'commons.js',
        //     minChunks: 2,
        // }),
        ...plugins
    ],
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules\/(?!(dom7|swiper)\/).*/,
                use: [
                    {
                        loader: 'babel-loader',
                        // options: { presets: ['es2015', 'stage-0', 'react'] },
                    },
                ],
            },

            {
                test: /\.jsx$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: { presets: ['react'] },
                    }
                ],
            },
        ]
    },
    resolve: {},
};
