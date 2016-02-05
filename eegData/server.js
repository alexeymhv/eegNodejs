/**
 * Created by alex on 15.3.12.
 */

var http = require('http');
var url = require('url');
var fs = require('fs');
var io = require('socket.io');

var server = http.createServer(function(request, response){
    var path = url.parse(request.url).pathname;
    console.log(path);

    switch(path){
        case '/':
            response.writeHead(200, {'Content-Type':'text/html'});
            response.write('hello world');
            response.end();
            break;
        case '/test.html':
            fs.readFile(__dirname + path, function(error, data){
                if(error){
                    response.writeHead(404);
                    response.write("The page doesn't exist - 404");
                    response.end;
                }
                else{
                    response.writeHead(200, {"Content-Type":"text/html"});
                    response.write(data, "utf8");
                    response.end();
                }
            });
            break;
        default:
            response.writeHead(404);
            response.write("The page doesn't exist - 404");
            response.end();
            break;
    }
});
server.listen(3000);
io.listen(server);

var SerialPort = require("serialport");
var bs = 256*17;

var eegModule = new SerialPort.SerialPort('/dev/ttyUSB0', {baudrate: 57600},{buffersize: bs}, {
    //parser: SerialPort.parsers.readline('\n')
});

var j=0;
var p = new Array();
var listener = io.listen(server);
var samplevalue = 0;
var valArr = new Array();

eegModule.on('data', function(data) {
    if(j < bs){
        if (data.length > 0) {
            if( j+data.length < bs){
                for (i = 0; i < data.length; i++) {
                    p.push(data[i].toString());
                }
                j+=data.length;
            }
            else{
                j = bs;
            }
        }
    }
    else{
        var tmp = 17;
        var idx = 0;
        var dataArr = new Array();

        for(z = 0; z< p.length; z++){
            if(p[z] == 90 && p[z+16] == 165){
                tmp = 0;
            }
            if(tmp < 17){
                process.stdout.write(p[z].toString() + " ");
                dataArr.push(p[z]);
            }
            tmp++;
            if(tmp == 17){
                process.stdout.write("\n");
            }
        }
        console.log("\n");

        for(i=3; i< dataArr.length; i+=17){
            samplevalue = ((dataArr[i] * 256) + dataArr[i+1] -512) * Math.pow(10, -6);
            valArr.push(samplevalue);
            //console.log(samplevalue);
        }

        listener.sockets.emit('message', {'message':valArr});

        p.length = 0;

        dataArr.length = 0;
        j = 0;
    }

});

var listener = io.listen(server);
listener.sockets.on('connection', function(socket){

    console.log("ASDASDSDADSA");

    socket.on ('messageSuccess', function (data) {
        valArr.length = 0;
        console.log(data);
    });
})
