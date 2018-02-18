var svr = require('./server');
svr.startSvr();
return;
var events = require('events');

var eventEmitter = new events.EventEmitter();
var ehd = function connected() {
    console.log('connected called')
    eventEmitter.emit('data_received')
    console.log('connected called end')
}
eventEmitter.on('connection', ehd);

eventEmitter.on('data_received', function() {
    console.log('data received successfully.')
});
console.log('events call end')
eventEmitter.emit('connection');

var fs = require("fs");
var data = fs.readFileSync('2016-08-23_IOS-Launcher-Log');
console.log('syn read file end');
//console.log(data.toString() + 'readfilesy end');

fs.readFile('2016-08-23_IOS-Launcher-Log', function(err, data) {
    if (err)
        return console.error(err);

    console.log('asyn read file end');
    // console.log(data.toString() + 'asyn read file end');
});
var http = require("http");
http.createServer(function(request, response) {
    response.writeHead(200, { 'Content-Type': 'text/plain' });
    response.end('hellow world \n');
}).listen(8081);
console.log('server running at http://127.0.0.1:8081/');
var fs = require("fs");

console.log("准备打开文件！");
fs.stat('input.txt', function(err, stats) {
    if (err) {
        return console.error(err);
    }
    console.log(stats);
    console.log("读取文件信息成功！");

    // 检测文件类型
    console.log("是否为文件(isFile) ? " + stats.isFile());
    console.log("是否为目录(isDirectory) ? " + stats.isDirectory());
});

fs = require("fs");

console.log("准备写入文件");
fs.writeFile('input.txt', '我是通过写入的文件内容！', function(err) {
    if (err) {
        return console.error(err);
    }
    console.log("数据写入成功！");
    console.log("--------我是分割线-------------")
    console.log("读取写入的数据！");
    fs.readFile('input.txt', function(err, data) {
        if (err) {
            return console.error(err);
        }
        console.log("异步读取文件数据: " + data.toString());
    });
});

fs = require("fs");
var buf = new Buffer(1024);

console.log("准备打开文件！");
fs.open('input.txt', 'r+', function(err, fd) {
    if (err) {
        return console.error(err);
    }
    console.log("文件打开成功！");
    console.log("截取10字节后的文件内容。");

    // 截取文件
    fs.ftruncate(fd, 10, function(err) {
        if (err) {
            console.log(err);
        }
        console.log("文件截取成功。");
        console.log("读取相同的文件");
        fs.read(fd, buf, 0, buf.length, 0, function(err, bytes) {
            if (err) {
                console.log(err);
            }

            // 仅输出读取的字节
            if (bytes > 0) {
                console.log(buf.slice(0, bytes).toString());
            }

            // 关闭文件
            fs.close(fd, function(err) {
                if (err) {
                    console.log(err);
                }
                console.log("文件关闭成功！");
            });
        });
    });
});

console.log("准备删除文件！");
fs.unlink('input.txt', function(err) {
    if (err) {
        return console.error(err);
    }
    console.log("文件删除成功！");
});

console.log("查看 /tmp 目录");
fs.readdir("/tmp/", function(err, files) {
    if (err) {
        return console.error(err);
    }
    files.forEach(function(file) {
        console.log(file);
    });
});

fs.open(fileName, "a+", function(err, fd) {
    if (err) {
        return console.error(err);
    }
    fs.writeFile(fd, "bb", function(err) {
        if (err) {
            return console.error(err);
        }
    });
});