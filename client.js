var http = require('http');

var svr = require('./server');
svr.startSvr();
// 用于请求的选项
var options = {
    host: 'localhost',
    port: '8080',
    path: '/diff.html'
};

// 处理响应的回调函数
var callback = function(response) {
        // 不断更新数据
        var body = '';
        response.on('data', function(data) {
            body += data;
        });

        response.on('end', function(err, data) {
            if (err) {
                console.log(err);
                // HTTP 状态码: 404 : NOT FOUND
                // Content Type: text/plain
                response.writeHead(404, { 'Content-Type': 'text/html' });
            } else
                console.log(body);
        });
    }
    // 向服务端发送请求
var req = http.request(options, callback);
req.end();