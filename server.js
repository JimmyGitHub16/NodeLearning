var http = require('http');
var url = require('url');
var util = require('util');

function launchSvr() {
    http.createServer(function(req, res) {
        res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
        // 解析 url 参数
        var params = url.parse(req.url, true).query;
        res.write("网站名：" + params.name);
        res.write("\n");
        res.write("网站 URL：" + params.url);
        console.log('url string is:' + util.inspect(url.parse(req.url, true)));
        console.log('url query string is:' + util.inspect(url.parse(req.url, true).query));
        res.end();

        //  res.end(util.inspect(url.parse(req.url, true)));
    }).listen(8081);
}

exports.startSvr = launchSvr;