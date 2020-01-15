const express = require("express");
const webpack = require("webpack");
const webpackDevMiddleware = require("webpack-dev-middleware");
var proxyMiddleware = require("http-proxy-middleware");
const open = require("open");
const isDev = process.env.NODE_ENV == "development";

const app = express();
const webpackConfig = isDev
    ? require("./build/webpack.dev.config")
    : require("./build/webpack.prod.config");
const compiler = webpack(webpackConfig);

const port = process.env.PORT || 8061;

// Define HTTP proxies to your custom API backend
// https://github.com/chimurai/http-proxy-middleware
var proxyTable = {};

// Tell express to use the webpack-dev-middleware and use the webpack.config.js
// configuration file as a base.
const devMiddleware = webpackDevMiddleware(compiler, {
    publicPath: webpackConfig.output.publicPath,
    stats: {
        colors: true,
        chunks: false
    }
});
app.use(devMiddleware);

const hotMiddleware = require("webpack-hot-middleware")(compiler);
// force page reload when html-webpack-plugin template changes
compiler.plugin("compilation", function(compilation) {
    compilation.plugin("html-webpack-plugin-after-emit", function(data, cb) {
        hotMiddleware.publish({ action: "reload" });
        cb();
    });
});

// enable hot-reload and state-preserving
// compilation error display
app.use(hotMiddleware);

// proxy api requests
Object.keys(proxyTable).forEach(function(context) {
    var options = proxyTable[context];
    if (typeof options === "string") {
        options = { target: options };
    }
    app.use(proxyMiddleware(context, options));
});

// Serve the files on port 8061.
module.exports = app.listen(port, function() {
    console.log("listening on port " + port + "!\n" + new Date() + "\n");
    open("http://localhost:" + port);
});
