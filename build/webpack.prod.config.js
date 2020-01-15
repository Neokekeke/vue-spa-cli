const path = require("path");
const autoprefixer = require("autoprefixer");
const webpack = require("webpack");
const merge = require("webpack-merge");
const base = require("./webpack.base.config");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = merge(base, {
    entry: {
        main: path.resolve(__dirname, "../src/index.js"),
        vendor: ['vue', 'vuex', 'axios', 'vue-router']
	},
	output: {
        path: path.resolve(__dirname, "../dist"),
		filename: "js/[name].[chunkhash:8].js",
		publicPath: "/"
    },
    
	module: {
		rules: [
			{
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            // modules: true,
                        }
                    },
                    'postcss-loader'
                ],
                include: path.resolve(__dirname, '../src')
            },
            {
				test: /\.less$/,
				use: [
					MiniCssExtractPlugin.loader,
					{
						loader: "css-loader",
						options: {
							// modules: true,
							importLoaders: 1
						}
					},
					"postcss-loader",
					"less-loader"
				],
				include: path.resolve(__dirname, "../src")
			}
		]
	},
	plugins: [
		new webpack.LoaderOptionsPlugin({
			options: {
				context: __dirname,
				postcss: [autoprefixer]
			}
        }),
        new MiniCssExtractPlugin({
            filename: 'css/[name]_[hash:8].css',
        }),
        new HtmlWebpackPlugin({
			//输出js文件到HTML中，有几个输出几个
			//创建一个在内存中生成html页面的插件
			template: path.resolve(__dirname, "../src/index.html"), //指定模板页面
			//将来会根据此页面生成内存中的页面
			filename: "index.html", //指定生成页面的名称，index.html浏览器才会默认直接打开
            inject: true,
            hash: true,
		})
	],
	optimization: {
		minimize: true,
		minimizer: [
			new UglifyJsPlugin({
				sourceMap: true,
				uglifyOptions: {
					ecma: 8,
					output: {
						comments: false, // 保留注释
						beautify: false // 不需要格式化
					},
					compress: {
						drop_console: true, // 去除console
						collapse_vars: true, // 内嵌定义了但是只有用到一次的变量
                        reduce_vars: true, // 提取出出现多次但是没有定义成变量去引用的静态值
					}
				}
			})
		],
		runtimeChunk: {
			name: "manifest"
        },
        splitChunks:{
            chunks: 'async',
            minSize: 30000,
            minChunks: 1,
            maxAsyncRequests: 5,
            maxInitialRequests: 3,
            name: true,
            cacheGroups: {
                vendors: {
                    name: 'vendor',
                    chunks: 'initial',
                    priority: -10,
                    reuseExistingChunk: true,
                    test: /[\\/]node_modules[\\/]/,
                },
                commons: {
                    name: "commons",
                    chunks: "initial",
                    minChunks: 2
                }
            }
        }
	}
});