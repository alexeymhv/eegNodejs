/**
 * Created by aleksejs on 16.10.4.
 */

var net = require('net');

var server = net.createServer(function (socket) {
    console.log('Connected...');
    socket.write('Echo server\r\n');
    socket.on('end', function(){
        console.log('Server disconnected...');
    });
    socket.on('data', function(data){
       console.log(data.toString());
    });
});

server.listen(1337, '127.0.0.1');
