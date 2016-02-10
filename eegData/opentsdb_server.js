/**
 * Created by alex on 16.6.2.
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
server.listen(3000, '127.0.1.1');
io.listen(server);
var listener = io.listen(server);

var opentsdb = require( 'opentsdb' );
var client = opentsdb.client();
client.host( '127.0.0.1' );
client.port( 4242 );

var mQuery = opentsdb.mquery();
mQuery.aggregator( 'sum' );
mQuery.tags( 'host', 'A' );
mQuery.metric( 'eeg.data' );

client.start( '2016/02/06-21:52:38' );
client.end( '2016/02/07-17:01:24' );
client.queries(mQuery);

var valArr = new Array();
var timeArr = new Array();
var s = false;

client.get( function onData(error, data){
    if(error){
        console.error(JSON.stringify(error));
        return;
    }
    //console.log(JSON.stringify(data, true, '\t'));
    data.toString();

    for(i=0; i<data[0].dps.length; i++){
            valArr.push(data[0].dps[i][0].toString());
            valArr.push(data[0].dps[i][1].toString());
        //timeArr.push(data[0].dps[i][0].toString());
        //valArr.push(data[0].dps[i][1].toString());
    }

    listener.sockets.on('connection', function(socket){

        listener.sockets.emit('message', {'message':valArr});
        socket.on ('messageSuccess', function (data) {
            console.log(data);
        });
    })

});

//listener.sockets.on('connection', function(socket){
//
//    //listener.sockets.emit('message', {'message':valArr});
//    socket.on ('messageSuccess', function (data) {
//        console.log(data);
//    });
//})