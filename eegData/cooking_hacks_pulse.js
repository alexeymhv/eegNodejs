/**
 * Created by aleksejs on 16.20.3.
 */
var io = require('socket.io', {forceNew: true});

var serialport = require('serialport');
var SerialPort = serialport.SerialPort;

var portName = '/dev/ttyACM0';

var connection = new SerialPort(portName, {
    baudRate:115200,
    parser:serialport.parsers.readline("\n")
})

connection.on('open', function(){
    console.log("Connected...");
});

connection.on('data', function(data) {
        //var BPM = 0;
        //var SPO2 = 0;
        ////var Position = 0;
        //var rpmArray = data.split("|");
        //BPM = rpmArray[0];
        //SPO2 = rpmArray[1];
        //Position = rpmArray[2];

        //console.log("BPM = " + BPM + "; SPO2 = " + SPO2);
        console.log(data);
});
