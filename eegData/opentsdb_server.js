/**
 * Created by alex on 16.6.2.
 */

var http = require('http');
var url = require('url');
var fs = require('fs');
var io = require('socket.io', {forceNew: true});

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
server.listen(3000, '127.0.1.1');
io.listen(server);
var listener = io.listen(server);

var opentsdb = require( 'opentsdb' );
var client = opentsdb.client();
//client.host( '192.168.0.108' );
client.host('127.0.0.1');
client.port( 4242 );

var mQuery = opentsdb.mquery();
mQuery.aggregator( 'sum' );
mQuery.tags( 'host', 'A' );
mQuery.metric( 'eeg.data' );

var valArr = new Array();
var timeArr = new Array();

setInterval(function(){
    var data = new Date();
    var current_time = parseInt(data.getTime()/1000);
    console.log(current_time-2000);
    console.log(current_time);

    client.start( convertTime(current_time-500) );
    client.end( convertTime(current_time) );
    client.queries(mQuery);

    client.get( function onData(error, data){
        if(error){
            console.error(JSON.stringify(error));
            return;
        }

        data.toString();

        for(i=0; i<data[0].dps.length; i++){
            valArr.push(data[0].dps[i][0].toString());
            valArr.push(data[0].dps[i][1].toString());
        }

        listener.sockets.emit('message', {'message':valArr});

        valArr.length = 0;

    });
},1000);

function convertTime(timestamp) {
    var date = new Date(timestamp * 1000);
    var tmpMonth = date.getMonth();
    if(parseInt(tmpMonth) < 9)
        var month = '0' + (tmpMonth+1);
    else
        var month = tmpMonth+1;

    var year = date.getFullYear();

    var tmpDay = date.getDate();
    if(parseInt(tmpDay) < 10)
        var day = '0' + tmpDay;
    else
        var day = tmpDay;

    var tmpHour = date.getHours();
    if(parseInt(tmpHour) < 10)
        var hour = '0' + tmpHour;
    else
        var hour = tmpHour;

    var tmpMinutes = date.getMinutes();
    if(parseInt(tmpMinutes) < 10)
        var minutes = '0' + tmpMinutes;
    else
        var minutes = tmpMinutes;

    var tmpSeconds = date.getSeconds();
    if(parseInt(tmpSeconds) < 10)
        var seconds = '0' + tmpSeconds;
    else
        var seconds = tmpSeconds;

    var newDate = year + '/' + month + '/' + day + '-' + hour + ':' + minutes + ':' + seconds;

    return newDate;
}