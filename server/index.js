// nodemon 只--watch server 目录，其他目录由webpack进行热更新。package.json写不了注释
var express = require('express');
var app = express();
// var config = require('../config/index.js'); TODO
var config = require('../config/webpack.config.dev.js');
var path = require('path');

app.get('/hello', function (req, res) {
  res.send('GET request to the hom');
});
app.get('/hello1', function (req, res) {
  res.send('hello1');
});
app.use('/', require('connect-history-api-fallback')());
// app.use('/', express.static(config.staticPath)); TODO
// 导出地址 
app.use('/', express.static(path.resolve(__dirname, '..', 'build')));

if (process.env.NODE_ENV !== 'production') {
    var webpack = require('webpack');
    // var webpackConfig = require('../config/webpack/webpack.dev.config.js'); TODO
    var webpackConfig = require('../config/webpack.config.dev.js');
    var webpackCompiled = webpack(webpackConfig);
    // 配置运行时打包
    var webpackDevMiddleware = require('webpack-dev-middleware');
    app.use(webpackDevMiddleware(webpackCompiled, {
        publicPath: config.output.publicPath,
        stats: {colors: true},
        lazy: false,
        watchOptions: {
            aggregateTimeout: 300,
            poll: true,
        },
    }));

    // 配置热更新
    var webpackHotMiddleware = require('webpack-hot-middleware');
    app.use(webpackHotMiddleware(webpackCompiled));
}

var server = app.listen(2000, function () {
    var port = server.address().port;
    console.log('Open http://localhost:%s', port);
});
