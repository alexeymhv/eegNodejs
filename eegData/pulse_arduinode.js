/**
 * Created by aleksejs on 16.19.3.
 */

var Arduinode = require("arduinode").Arduinode;
var port = "/dev/ttyACM0";

var delaySeconds = require('sleep');
var delayMicroseconds = require('sleep');

var BPM = 0;
var SPO2 = 0;
var cont = 0;

var arduinode = new Arduinode(port, function(err, result){
    if(err){
        return console.log(err);
    }
    console.log("Connected...");
    //initPulsioximeter();
    arduinode.digitalRead(6, function(err, result){
        if(err){
            return console.log(err);
        }
        console.log(result);
        // { msg: 'OK', port: 0, val: 1 }
    });

    //arduinode.attachInterrupt(0, "RISING", function(err, result){
    //    if(err){
    //        return console.log(err);
    //    }
    //
    //    console.log(result);
    //});



    //arduinode.on('event', function (data) {
    //   console.log(data);
    //});

    //initPulsioximeter();
});




var readPulsioximeter = function(){
    //var array = new Uint8Array(41);
    //
    //var A = 0;
    //var B = 0;
    //var C = 0;
    //var D = 0;
    //var E = 0;
    //var F = 0;
    //var G = 0;
    //
    //for(i=0; i<41; i++){
    //    A = !arduinode.digitalRead(13);
    //    B = !arduinode.digitalRead(12);
    //    C = !arduinode.digitalRead(11);
    //    D = !arduinode.digitalRead(10);
    //    E = !arduinode.digitalRead(9);
    //    F = !arduinode.digitalRead(8);
    //    G = !arduinode.digitalRead(7);
    //
    //    array[i] = segToNumber(A, B, C, D, E, F, G);
    //    delayMicroseconds.usleep(300);
    //}
    //
    //BPM = (100 * array[19]) + (10 * array[2]) + array[0];
    //SPO2 = 10 * array[25] + array[20];
    console.log(arduinode.digitalRead(13));
};

var initPulsioximeter = function(){
    arduinode.pinMode(6, "INPUT", function(err, result){
        if(err){
            return console.log(err);
        }
        console.log(result);
    });
    //arduinode.pinMode(12, "INPUT");
    //arduinode.pinMode(11, "INPUT");
    //arduinode.pinMode(10, "INPUT");
    //arduinode.pinMode(9, "INPUT");
    //arduinode.pinMode(8, "INPUT");
    //arduinode.pinMode(7, "INPUT");
    //arduinode.pinMode(6, "INPUT");
};

var segToNumber = function(A, B, C, D, E, F, G){
    if ((A == 1) && (B == 1) && (C == 1) && (D == 0) && (E == 1) && (F == 1) && (G == 1)) {
        return 0;

    } else if ((A == 0) && (B == 1) && (C == 0) && (D == 0) && (E == 1) && (F == 0) && (G == 0)) {
        return 1;

    } else if ((A == 1) && (B == 1) && (C == 0) && (D == 1) && (E == 0) && (F == 1) && (G == 1)) {
        return 2;

    } else if ((A == 1) && (B == 1) && (C == 0) && (D == 1) && (E == 1) && (F == 0) && (G == 1)) {
        return 3;

    } else if ((A == 0) && (B == 1) && (C == 1) && (D == 1) && (E == 1) && (F == 0) && (G == 0)) {
        return 4;

    } else if ((A == 1) && (B == 0) && (C == 1) && (D == 1) && (E == 1) && (F == 0) && (G == 1)) {
        return 5;

    } else if ((A == 1) && (B == 0) && (C == 1) && (D == 1) && (E == 1) && (F == 1) && (G == 1)) {
        return 6;

    } else if ((A == 1) && (B == 1) && (C == 0) && (D == 0) && (E == 1) && (F == 0) && (G == 0)) {
        return 7;

    } else if ((A == 1) && (B == 1) && (C == 1) && (D == 1) && (E == 1) && (F == 1) && (G == 1)) {
        return 8;

    } else if ((A == 1) && (B == 1) && (C == 1) && (D == 1) && (E == 1) && (F == 0) && (G == 1)) {
        return 9;

    } else  {
        return 0;
    }
}
