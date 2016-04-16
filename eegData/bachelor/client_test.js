/**
 * Created by aleksejs on 16.10.4.
 */

var net = require('net');

var client = new net.Socket();
client.connect(1337, '127.0.0.1', function(){
    console.log('Connected...');
    client.write('Hello, server! Its me, client!');
});

client.on('data', function(data){
    console.log(data.toString());
});

client.on('end', function(){
   console.log('Client disconnected...');
});



