const path = require('path');
const webpack = require('./node_modules/webpack');
const VueLoaderPlugin = require('./node_modules/vue-loader/lib/plugin');
const MiniCssExtractPlugin = require('./node_modules/mini-css-extract-plugin');

const isDev = process.env.NODE_ENV == 'development';
const isProd = process.env.NODE_ENV == 'production';

function resolve(dir) {
    return path.join(__dirname, '..', dir)
}


const webpackConfig = {
    // devtool: isProd
    //     ? 'source-map'
    //     : 'cheap-module-eval-source-map',

    mode: isProd ? 'production' : 'development',

    module: {
        noParse: /es6-promise\.js$/,
        rules: [
            {
                test: /\.(js|vue)$/,
                loader: 'eslint-loader',
                enforce: 'pre',
                include: path.join(__dirname, '..', 'src'),
                options: {
                    formatter: require('./node_modules/eslint-friendly-formatter')
                }
            },
            {
                test: /\.vue$/,
                use: [{
                    loader: 'vue-loader',
                    options: {
                        cssModules: {
                            camelCase: true
                        },
                        extractCSS: false,
                        preserveWhitespace: false,
                        postcss: [
                            require('./node_modules/autoprefixer')({
                                overrideBrowserslist: [
                                    "> 1%",
                                    "last 5 versions",
                                    "not ie <= 8",
                                    "Android >= 4",
                                    "UCAndroid >= 9",
                                    "iOS >= 8"
                                ]
                            })
                        ]
                    }
                }]
            },
            {
                test: /\.css$/,
                use: [
                    isProd ? MiniCssExtractPlugin.loader : 'vue-style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            javascriptEnabled: true
                        }
                    },
                    'postcss-loader'
                ],
                include: [
                    path.join(__dirname, '../node_modules/vant')
                ]
            },
            {
                test: /\.js$/,
                use: {
                    loader: 'babel-loader'
                },
                include: resolve('src')
            },
            {
                test: /\.(jpe?g|png|gif|ico|woff|woff2|eot|ttf|svg|swf)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 4000,
                            name: 'images/[name][hash:8].[ext]'
                        }
                    }
                ]
            }
        ]
    },

    performance: {
        maxEntrypointSize: 300000,
        hints: isDev ? false : 'warning'
    },

    resolve: {
        alias: {
            'vue': 'vue/dist/vue.esm.js',
        }
    },

    plugins: [
        new VueLoaderPlugin(),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': isProd ? JSON.stringify('production') : JSON.stringify('development')
        })
    ]
}

module.exports = webpackConfig;
