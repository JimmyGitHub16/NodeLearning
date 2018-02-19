var http = require('http');
var url = require('url');
var util = require('util');
var fs = require('fs');
var querystring = require('querystring');

var postHTML =
    '<html><head><meta charset="utf-8"><title>菜鸟教程 Node.js 实例</title></head>' +
    '<body>' +
    '<form method="post">' +
    '网站名： <input name="name"><br>' +
    '网站 URL： <input name="url"><br>' +
    '<input type="submit">' +
    '</form>' +
    '</body></html>';

function launchSvr() {
    /*  http.createServer(function(req, res) {
         var post = '';

         // 通过req的data事件监听函数，每当接受到请求体的数据，就累加到post变量中
         req.on('data', function(chunk) {
             post += chunk;
         });

         res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
         // 解析 url 参数
         var params = url.parse(req.url, true).query;
         res.write("网站名：" + params.name);
         res.write("\n");
         res.write("网站 URL：" + params.url);
         res.write('url string is:' + util.inspect(url.parse(req.url, true)));
         res.write('url query string is:' + util.inspect(url.parse(req.url, true).query));
         console.log('url string is:' + util.inspect(url.parse(req.url, true)));
         console.log('url query string is:' + util.inspect(url.parse(req.url, true).query));
         req.on('end', function() {
             post = querystring.parse(post);
             res.end('post data' + util.inspect(post));
         }); */
    // res.end();

    //  res.end(util.inspect(url.parse(req.url, true)));
    /* http.createServer(function(req, res) {
        var pathname = url.parse(req.url, true).pathname;
        if (pathname === '/favicon.ico') {
            console.log('favicon request');
            return;
        }

        var body = "";
        req.on('data', function(chunk) {
            body += chunk;
        });
        req.on('end', function() {
            // 解析参数
            body = querystring.parse(body);
            // 设置响应头部信息及编码
            res.writeHead(200, { 'Content-Type': 'text/html; charset=utf8' });

            if (body.name && body.url) { // 输出提交的数据
                res.write("网站名：" + body.name);
                res.write("<br>");
                res.write("网站 URL：" + body.url);
            } else { // 输出表单
                res.write(postHTML);
            }
            res.end();
        });
    }).listen(8081); */
    // 创建服务器
    http.createServer(function(request, response) {
        // 解析请求，包括文件名
        var pathname = url.parse(request.url).pathname;

        // 输出请求的文件名
        console.log("Request for " + pathname + " received.");

        // 从文件系统中读取请求的文件内容
        fs.readFile(pathname.substr(1), function(err, data) {
            if (err) {
                console.log(err);
                // HTTP 状态码: 404 : NOT FOUND
                // Content Type: text/plain
                response.writeHead(404, { 'Content-Type': 'text/html' });
            } else {
                // HTTP 状态码: 200 : OK
                // Content Type: text/plain
                response.writeHead(200, { 'Content-Type': 'text/html' });

                // 响应文件内容
                response.write(data.toString());
            }
            //  发送响应数据
            response.end();
            console.log('response end');
        });
    }).listen(8080);
}

exports.startSvr = launchSvr;