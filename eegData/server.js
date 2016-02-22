/**
 * Created by alex on 15.3.12.
 */
//var io = require('socket.io');

var SerialPort = require("serialport");
var bs = 256*17;

var eegModule = new SerialPort.SerialPort('/dev/ttyUSB0', {baudrate: 57600},{buffersize: bs});

var createSocket = require( 'opentsdb-socket' );
var socket = createSocket();

//socket.host( '192.168.0.108' );
socket.host( '127.0.0.1' );
socket.port( 4242 );
socket.connect();

var j=0;
var p = new Array();
var samplevalue = 0;

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

        var value  = '';
        var now = require('date-now');
        //var now = parseInt(data.getTime()/1000);

        for(i=3; i< dataArr.length; i+=17){
            samplevalue = ((dataArr[i] * 256) + dataArr[i+1] -512) * Math.pow(10, -6);
            value += 'put ';
            value += 'eeg.data ';
            value += parseInt(Date.now()/1000) + ' ';
            value += samplevalue + ' ';
            value += 'host=A\n';

            socket.write( value, function ack() {
                value = '';
            });
        }
        //console.log(Date.now());
        console.log('...data written...');
        p.length = 0;

        dataArr.length = 0;
        j = 0;
    }
});

//var listener = io.listen(server);
//listener.sockets.on('connection', function(socket){
//
//    console.log("ASDASDSDADSA");
//
//    socket.on ('messageSuccess', function (data) {
//        valArr.length = 0;
//        console.log(data);
//    });
//})
