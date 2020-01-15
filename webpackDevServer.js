// webpack 起的web本地服务器
const devServer = {
	contentBase: path.resolve(__dirname, "../dist"),
	compress: true,
	port: 8061,
	historyApiFallback: true, //不跳转
	host: "0.0.0.0",
	hot: true,
	inline: true, //实时刷新
	// hot: true, //Enable webpack's Hot Module Replacement feature HMR
	compress: true, //Enable gzip compression for everything served
	overlay: {
		//Shows a full-screen overlay in the browser
		warnings: true,
		errors: true
	},
	stats: "errors-only", //To show only errors in your bundle
	open: true //When open is enabled, the dev server will open the browser.
};

module.exports = devServer;