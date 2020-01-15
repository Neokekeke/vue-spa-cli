const path = require("path");
const autoprefixer = require("autoprefixer");
const webpack = require("webpack");
const merge = require("webpack-merge");
const base = require("./webpack.base.config");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = merge(base, {
    entry: {
		main: ["webpack-hot-middleware/client?reload=true", path.resolve(__dirname, "../src/index.js")]
    },
    
	output: {
		filename: "[name].js",
		path: path.resolve(__dirname, "../dist"),
		publicPath: "/"
    },
    
	module: {
		rules: [
			{
				test: /\.css$/,
				use: [
					"vue-style-loader",
					{
						loader: "css-loader",
						options: {
							importLoaders: 1
						}
					},
					"postcss-loader"
				],
				include: path.resolve(__dirname, "../src")
            },
            {
				test: /\.less$/,
				use: [
					"vue-style-loader",
					{
						loader: "css-loader",
						options: {
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
        new webpack.HotModuleReplacementPlugin(),

        new webpack.NoEmitOnErrorsPlugin(),

		new webpack.LoaderOptionsPlugin({
			options: {
				context: __dirname,
				postcss: [autoprefixer]
			}
        }),

        new HtmlWebpackPlugin({
			//输出js文件到HTML中，有几个输出几个
			template: path.resolve(__dirname, "../src/index.html"), //指定模板页面
			filename: "index.html", //指定生成页面的名称，index.html浏览器才会默认直接打开
            inject: true,
            hash: true,
            hash: true
		})
    ],
    
    optimization: {
        minimize: true,
        runtimeChunk: {
            name: 'manifest'
        },
        splitChunks: {
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