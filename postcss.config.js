module.exports = {
	plugins: {
		"postcss-import": {},
		autoprefixer: {
			overrideBrowserslist: [
				"> 1%",
				"last 5 versions",
				"not ie <= 8",
				"ios >= 8",
				"android >= 4.0",
				"Chrome > 31",
				"ff > 31"
			]
		}
	}
};
