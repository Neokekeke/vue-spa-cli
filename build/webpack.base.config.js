const path = require("path");
const webpack = require("webpack");
const vConsolePlugin = require("vconsole-webpack-plugin");
const autoprefixer = require("autoprefixer");
const VueLoaderPlugin = require('vue-loader/lib/plugin');

// path
// console.log("/src路径", path.resolve(__dirname, "/src")); // C:\src
// console.log("./src路径", path.resolve(__dirname, "./src")); // C:\Users\Desktop\demo\build\src
// console.log("../src路径", path.resolve(__dirname, "../src")); // C:\Users\Desktop\demo\src

const isDev = process.env.NODE_ENV == "development";
const isProd = process.env.NODE_ENV == "production";

module.exports = {
    // devtool: "inline-source-map", // 追踪报错的文件位置

    mode: isDev ? "development" : "production",
    
	module: {
		rules: [
			{
				test: /\.js$/,
				use: {
					loader: "babel-loader"
				},
				include: path.join(__dirname, "../src"),
				exclude: /node_modules/,
            },
            {
				test: /\.vue$/,
				use: {
                    loader: "vue-loader",
					options: {
                        cssModules: {
                            localIdentName: '[name]-[local]-[hash:base64:5]',
                            camelCase: true
                        },
                        extractCSS: false,
                        preserveWhitespace: false,
						postcss: [
							autoprefixer({
								overrideBrowserslist: [
									"> 1%",
									"last 5 versions",
									"not ie <= 8",
									"ios >= 8",
									"android >= 4.0",
									"Chrome > 31",
									"ff > 31"
								]
							})
						]
					}
				},
				include: path.join(__dirname, "../src")
			},
			{
				test: /\.(jpe?g|png|gif|ico|woff|woff2|eot|ttf|svg|swf|otf)$/,
				use: [
					{
						loader: "url-loader",
						options: {
							limit: 4000,
							name: "images/[name][hash:8].[ext]"
						}
					}
				]
			},
		]
    },

    performance: {
        maxEntrypointSize: 300000,
        hints: isDev ? false : 'warning'
    },

    resolve: {
		extensions: [".js", ".json"],
		alias: {
			vue: "vue/dist/vue.js"
		}
    },
    
	plugins: [
        new VueLoaderPlugin(),

		new vConsolePlugin({
			filter: [], // 需要过滤的入口文件
			enable: isDev ? true : false // 发布代码前记得改回 false
        }),
        
		// 这里定义的是全局变量
		new webpack.DefinePlugin({
			"process.env.NODE_ENV" : isDev ? JSON.stringify("development") : JSON.stringify("production"),
			"process.env.PORT": 8061
        }),
	]
};


