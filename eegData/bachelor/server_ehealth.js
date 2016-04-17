/**
 * Created by aleksejs on 16.20.3.
 */
var http = require('http');
var url = require('url');
var fs = require('fs');
var io = require('socket.io', {forceNew: true});

//**Initialising serialport**/
var serialport = require('serialport');
var SerialPort = serialport.SerialPort;
var portName = '/dev/ttyACM0';

//**Initialising connection to opentsdb**//
//TODO Check if there is a connection to port
var connection = new SerialPort(portName, {
    baudRate:115200,
    parser:serialport.parsers.readline("\n")
});
//**************************************//

var server = http.createServer(function(request, response){
    var path = url.parse(request.url).pathname;

    switch(path){
        case '/':
            response.writeHead(200, {'Content-Type':'text/html'});
            response.write('hello world');
            response.end();
            break;
        case '/eegsmt.html':
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
        case '/rpm.html':
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
        case '/pulsometer.html':
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
        case '/index.html':
            fs.readFile(__dirname + "/ehealth-platform" + path, function(error, data){
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
        case '/app.js':
            fs.readFile(__dirname + "/ehealth-platform" + path, function(error, data){
                if(error){
                    response.writeHead(404);
                    response.write("The page doesn't exist - 404");
                    response.end;
                }
                else{
                    response.writeHead(200, {"Content-Type":"text/javascript"});
                    response.write(data, "utf8");
                    response.end();
                }
            });
            break;
        case '/ehealthController.js':
            fs.readFile(__dirname + "/ehealth-platform" + path, function(error, data){
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
        case '/bower_components/bootstrap/dist/css/bootstrap.min.css':
            fs.readFile(__dirname + "/ehealth-platform" + path, function(error, data){
                if(error){
                    response.writeHead(404);
                    response.write("The page doesn't exist - 404");
                    response.end;
                }
                else{
                    response.writeHead(200, {"Content-Type":"text/css"});
                    response.write(data, "utf8");
                    response.end();
                }
            });
            break;
        case '/bower_components/angular-dashboard-framework/dist/angular-dashboard-framework.min.css':
            fs.readFile(__dirname + "/ehealth-platform" + path, function(error, data){
                if(error){
                    response.writeHead(404);
                    response.write("The page doesn't exist - 404");
                    response.end;
                }
                else{
                    response.writeHead(200, {"Content-Type":"text/css"});
                    response.write(data, "utf8");
                    response.end();
                }
            });
            break;
        case '/bower_components/angular/angular.js':
            fs.readFile(__dirname + "/ehealth-platform" + path, function(error, data){
                if(error){
                    response.writeHead(404);
                    response.write("The page doesn't exist - 404");
                    response.end;
                }
                else{
                    response.writeHead(200, {"Content-Type":"text/javascript"});
                    response.write(data, "utf8");
                    response.end();
                }
            });
            break;
        case '/bower_components/Sortable/Sortable.js':
            fs.readFile(__dirname + "/ehealth-platform" + path, function(error, data){
                if(error){
                    response.writeHead(404);
                    response.write("The page doesn't exist - 404");
                    response.end;
                }
                else{
                    response.writeHead(200, {"Content-Type":"text/javascript"});
                    response.write(data, "utf8");
                    response.end();
                }
            });
            break;
        case '/bower_components/angular-bootstrap/ui-bootstrap.js':
            fs.readFile(__dirname + "/ehealth-platform" + path, function(error, data){
                if(error){
                    response.writeHead(404);
                    response.write("The page doesn't exist - 404");
                    response.end;
                }
                else{
                    response.writeHead(200, {"Content-Type":"text/javascript"});
                    response.write(data, "utf8");
                    response.end();
                }
            });
            break;
        case '/bower_components/angular-bootstrap/ui-bootstrap-tpls.js':
            fs.readFile(__dirname + "/ehealth-platform" + path, function(error, data){
                if(error){
                    response.writeHead(404);
                    response.write("The page doesn't exist - 404");
                    response.end;
                }
                else{
                    response.writeHead(200, {"Content-Type":"text/javascript"});
                    response.write(data, "utf8");
                    response.end();
                }
            });
            break;
        case '/bower_components/angular-dashboard-framework/dist/angular-dashboard-framework.js':
            fs.readFile(__dirname + "/ehealth-platform" + path, function(error, data){
                if(error){
                    response.writeHead(404);
                    response.write("The page doesn't exist - 404");
                    response.end;
                }
                else{
                    response.writeHead(200, {"Content-Type":"text/javascript"});
                    response.write(data, "utf8");
                    response.end();
                }
            });
            break;
        case '/bower_components/adf-structures-base/dist/adf-structures-base.min.js':
            fs.readFile(__dirname + "/ehealth-platform" + path, function(error, data){
                if(error){
                    response.writeHead(404);
                    response.write("The page doesn't exist - 404");
                    response.end;
                }
                else{
                    response.writeHead(200, {"Content-Type":"text/javascript"});
                    response.write(data, "utf8");
                    response.end();
                }
            });
            break;
        case '/bower_components/adf-widget-clock/dist/adf-widget-clock.min.css':
            fs.readFile(__dirname + "/ehealth-platform" + path, function(error, data){
                if(error){
                    response.writeHead(404);
                    response.write("The page doesn't exist - 404");
                    response.end;
                }
                else{
                    response.writeHead(200, {"Content-Type":"text/css"});
                    response.write(data, "utf8");
                    response.end();
                }
            });
            break;
        case '/bower_components/moment/moment.js':
            fs.readFile(__dirname + "/ehealth-platform" + path, function(error, data){
                if(error){
                    response.writeHead(404);
                    response.write("The page doesn't exist - 404");
                    response.end;
                }
                else{
                    response.writeHead(200, {"Content-Type":"text/javascript"});
                    response.write(data, "utf8");
                    response.end();
                }
            });
            break;
        case '/bower_components/adf-widget-clock/dist/adf-widget-clock.min.js':
            fs.readFile(__dirname + "/ehealth-platform" + path, function(error, data){
                if(error){
                    response.writeHead(404);
                    response.write("The page doesn't exist - 404");
                    response.end;
                }
                else{
                    response.writeHead(200, {"Content-Type":"text/css"});
                    response.write(data, "utf8");
                    response.end();
                }
            });
            break;
        case '/bower_components/bootstrap/dist/fonts/glyphicons-halflings-regular.woff2':
            fs.readFile(__dirname + "/ehealth-platform" + path, function(error, data){
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
        case '/bower_components/bootstrap/dist/fonts/glyphicons-halflings-regular.woff':
            fs.readFile(__dirname + "/ehealth-platform" + path, function(error, data){
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
        case '/bower_components/bootstrap/dist/fonts/glyphicons-halflings-regular.ttf':
            fs.readFile(__dirname + "/ehealth-platform" + path, function(error, data){
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
        case '/bower_components/adf-widget-bpmspo/dist/adf-widget-bpmspo.min.js':
            fs.readFile(__dirname + "/ehealth-platform" + path, function(error, data){
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
server.listen(3000, '127.0.1.1');
var listener = io.listen(server);

connection.on('open', function(){
    console.log("Connected...");
});

var wait = 0;
connection.on('data', function(data){
    if(wait < 10)
        wait++;
    else{
        console.log(GetPulseDataArray(data)[0] + " " + GetPulseDataArray(data)[1]);
        var msg = GetPulseDataArray(data)[0] + "|" + GetPulseDataArray(data)[1];
        listener.sockets.emit('pulse data', msg);
    }
});

function GetPulseDataArray(data){
    var arr = data.split("|");
    var pulse = new Array(2);
    pulse[0] = arr[4];
    pulse[1] = arr[5];
    return pulse;
}



