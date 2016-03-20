/**
 * Created by aleksejs on 16.19.3.
 */

var johnny_five = require('johnny-five');

var BPM = 0;
var SPO2 = 0;
var cont = 0;
var delayMicroseconds = require('sleep');
var delaySeconds = require('sleep');

var board = new johnny_five.Board({
    port: '/dev/ttyACM0'
});

board.on('ready',function(){
    initPulsioximeter();
    var state = false;

    this.digitalRead(6, function(value){
        if(state == false && value == true){
            readPulsioximeter();

            console.log(getBPM());
            state = value;
        }
        else if(state == true && value == false){
            //console.log(state + " -> " + value);
            state = value;
        }
    });

    //while(true){
    //    this.digitalRead(6, function(value){
    //        console.log(value);
    //        if(state == false && value == true){
    //            readPulsioximeter();
    //            console.log(state + " -> " + value);
    //            state = value;
    //        }
    //        else if(state == true && value == false){
    //            console.log(state + " -> " + value);
    //            state = value;
    //        }
    //    });
    //    console.log("BPM: " + getBPM() + "  SPO2: " + getSPO2());
    //    delaySeconds.sleep(1);
    //}


    //this.digitalRead(6, function(value){
    //    console.log("pin 6: " + value);
    //});
    //this.digitalRead(7, function(value){
    //    console.log("pin 7:" + value);
    //});
});

var initPulsioximeter = function(){
    board.pinMode(13, board.MODES.INPUT);
    board.pinMode(12, board.MODES.INPUT);
    board.pinMode(11, board.MODES.INPUT);
    board.pinMode(10, board.MODES.INPUT);
    board.pinMode(9, board.MODES.INPUT);
    board.pinMode(8, board.MODES.INPUT);
    board.pinMode(7, board.MODES.INPUT);
    board.pinMode(6, board.MODES.INPUT);
}

var readPulsioximeter = function(){
    var array = new Uint8Array(41);

    var A = 0;
    var B = 0;
    var C = 0;
    var D = 0;
    var E = 0;
    var F = 0;
    var G = 0;

    board.digitalRead(13, function(value){
        A = !value;
    });
    board.digitalRead(12, function(value){
        B = !value;
    });
    board.digitalRead(11, function(value){
        C = !value;
    });
    board.digitalRead(10, function(value){
        D = !value;
    });
    board.digitalRead(9, function(value){
        E = !value;
    });
    board.digitalRead(8, function(value){
        F = !value;
    });
    board.digitalRead(7, function(value){
        G = !value;
    });

    for(i=0; i<41; i++){
        array[i] = segToNumber(A, B, C, D, E, F, G);
        delayMicroseconds.usleep(300);
    }
        //
        //array[i] = segToNumber(A, B, C, D, E, F, G);
        //delayMicroseconds.usleep(300);
    //
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