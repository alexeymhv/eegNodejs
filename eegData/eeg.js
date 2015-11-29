/**
 * Created by alex on 15.9.11.
 */
var SerialPort = require("serialport");
var bs = 256*17;

var eegModule = new SerialPort.SerialPort('/dev/ttyUSB0', {baudrate: 57600},{buffersize: bs}, {
    parser: SerialPort.parsers.readline('\n')
});

var j=0;
var p = new Array();

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
        var tmp = 0;
        var idx = 0;
        var dataArr = new Array();

        for(z = 0; z< p.length; z++){
            if(p[z] == 90){
                idx = z;
                tmp = p[z];
            }
            if(tmp == 90){
                //process.stdout.write(p[z].toString() + " ");
                // if(p[idx+16] == 165)
                dataArr.push(p[z]);
            }
            if(p[z] == 165 && p[z+1] == 90){
                tmp = p[z];
                //process.stdout.write("\n");
            }
        }
        console.log("\n");

        for(i = 0; i<dataArr.length; i++){
            process.stdout.write(dataArr[i].toString() + " ");
            if(dataArr[i] == 165 && dataArr[i+1] == 90){
                process.stdout.write("\n");
            }
        }

        dataArr.length = 0;
        j = 0;
        //eegModule.close();
    }

});



