/**
 * Created by aleksejs on 16.16.4.
 */

var serialport = require('serialport');
var SerialPort = serialport.SerialPort;
var portName = '/dev/ttyACM0';

var fft = require('fft-js').fft;
var fftUtil = require('fft-js').util;

var connection = new SerialPort(portName, {
    baudRate:115200,
    parser:serialport.parsers.readline("\n")
});

var arr = new Array();
var wait = 0;
var counter = 0;
var time = 0;
var phasors;

connection.on('data', function(data){
    if(wait < 10)
        wait++;
    else if(wait >= 10) {
        arr[counter] = parseFloat(GetPositionArray(data)[2]);
        console.log(counter);
        counter++;

        //if(rpmCounter == 32){
        //    rpmCounter = 0;
        //    var phasors = fft(rpmArray);
        //    var frequencies = fftUtil.fftFreq(phasors, 10);
        //    var magnitudes = fftUtil.fftMag(phasors);
        //    var both = frequencies.map(function (f, ix) {
        //        return {frequency: f, magnitude: magnitudes[ix]};
        //    });
        //    console.log(both);
        //    rpmArray.length = 0;
        //}
    }
});


//var tmparr = new Array();
//for(var i=0; i<32; i++){
//    tmparr[i] = i;
//}
//var phasors= fft(tmparr);
//console.log(phasors);
//
//var frequencies = fftUtil.fftFreq(phasors, 10);
//var magnitudes = fftUtil.fftMag(phasors);
//var both = frequencies.map(function (f, ix) {
//    return {magnitude: magnitudes[ix]};
//});
//console.log(both);


var timer = setInterval(function () {
    //time++;
    //console.log(time);
    //if(time == 60){
    //    console.log(rpmCounter);
    //    time = 0;
    //    rpmCounter = 0;
    //    if(rpmArray.length != 0)
    //        PrintArray(rpmArray);
    //    rpmArray.length = 0;
    //}
    console.log(counter);
    counter = 0;
}, 1000);

function GetPositionArray(data){
    var arr = data.split("|");
    var xyz = new Array(3);
    xyz[0] = arr[0];
    xyz[1] = arr[1];
    xyz[2] = arr[2];
    return xyz;
}

function PrintArray(array){
    for (var i=0; i<array.length; i++){
        console.log(i + ". " + array[i]);
    }
}