/**
 * Created by aleksejs on 16.12.3.
 */
//var SerialPort = require("serialport");
//var bs = 256*17;
//
//var pulseMeter = new SerialPort.SerialPort('/dev/ttyACM0', {baudrate: 115200},{dataBits: 8}, {parity: 'none'}, {stopBits: 1}, {flowControl: false}, {parser: SerialPort.parsers.readline("\r\n")});
//
//pulseMeter.on('data', function(data){
//    console.log(data.length.toString());
//
//
//});

//var SerialPort = require("serialport");
//var pulseMeter = new SerialPort.SerialPort('/dev/ttyACM0', {baudrate: 115200},{dataBits: 8}, {parity: 'none'}, {stopBits: 1}, {flowControl: false}, {parser: SerialPort.parsers.readline("\r\n")});


var ArduinoFirmata = require('arduino-firmata');
var arduino = new ArduinoFirmata();

var delayMicroseconds = require('sleep');
var delaySeconds = require('sleep');

arduino.connect('/dev/ttyACM0');

var BPM = 0;
var SPO2 = 0;
var cont = 0;


arduino.on('connect', function(){
    console.log("board version"+arduino.boardVersion);
    console.log("Connected...");

    initPulsioximeter();

    arduino.on('digitalChange', function(e){

        if(e.pin == 6){
            if(e.old_value == false && e.value == true){

                readPulsioximeter();
                cont++;

                if(cont == 50) {
                    readPulsioximeter();
                    console.log(e.pin + " " + e.old_value + " " + e.value);
                    console.log("BPM: " + getBPM() + "  SPO2: " + getSPO2());
                    cont = 0;
                }
            }
        }
    });
});

var initPulsioximeter = function(){
    arduino.pinMode(13, ArduinoFirmata.INPUT);
    arduino.pinMode(12, ArduinoFirmata.INPUT);
    arduino.pinMode(11, ArduinoFirmata.INPUT);
    arduino.pinMode(10, ArduinoFirmata.INPUT);
    arduino.pinMode(9, ArduinoFirmata.INPUT);
    arduino.pinMode(8, ArduinoFirmata.INPUT);
    arduino.pinMode(7, ArduinoFirmata.INPUT);
    arduino.pinMode(6, ArduinoFirmata.INPUT);
};

var readPulsioximeter = function(){
    var array = new Uint8Array(41);

    var A = 0;
    var B = 0;
    var C = 0;
    var D = 0;
    var E = 0;
    var F = 0;
    var G = 0;

    for(i=0; i<41; i++){
        A = !arduino.digitalRead(13);
        B = !arduino.digitalRead(12);
        C = !arduino.digitalRead(11);
        D = !arduino.digitalRead(10);
        E = !arduino.digitalRead(9);
        F = !arduino.digitalRead(8);
        G = !arduino.digitalRead(7);

        array[i] = segToNumber(A, B, C, D, E, F, G);
        delayMicroseconds.usleep(300);
    }

    BPM = (100 * array[19]) + (10 * array[2]) + array[0];
    SPO2 = 10 * array[25] + array[20];
};

var getSPO2 = function(){
    return SPO2;
}

var getBPM = function(){
    return BPM;
}

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

//function rethrow(){
//    return function(err){
//        if(err) throw err;
//    };
//}
//
//var makeCallback = function(cb){
//    if (typeof cb !== 'function') {
//        return rethrow();
//    }
//    return function() {
//        return cb.apply(null, arguments);
//    };
//}
//
//var attachInterrupt = function(num, mode, callback){
//    callback = makeCallback();
//
//    var self = this;
//
//}