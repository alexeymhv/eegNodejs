var http = require('http');
var port = 3000;
var serverUrl = "localhost";
var fs = require('fs');
var counter = 0;
var sample_value = 0;

var server;

//var Highcharts = require('highcharts');
//var server = new Highcharts(3003);
//
//var chartOptions = {
//    title: {
//        text: 'Monthly Average Temperature',
//        x: -20 //center
//    },
//    subtitle: {
//        text: 'Source: WorldClimate.com',
//        x: -20
//    },
//    xAxis: {
//        categories: ["Jan", "Feb", "Mar"]
//    },
//    yAxis: {
//        title: {
//            text: 'Temperature (C)'
//        },
//        plotLines: [{
//            value: 0,
//            width: 1,
//            color: '#808080'
//        }]
//    },
//    tooltip: {
//        valueSuffix: 'C'
//    },
//    legend: {
//        layout: 'vertical',
//        align: 'right',
//        verticalAlign: 'middle',
//        borderWidth: 0
//    },
//    series: [
//        {
//            data: [7.0, 6.9, 9.5]
//        }
//    ]
//};
//
//var imgOptions = {
//    width: 640,
//    scale: 2
//};
//
//function generateImgTag(base64png) {
//    // returns HTML5 img tag with data uri
//    return '<img src="data:image/png;base64,' + base64png + '" alt="Monthly Average Temperature" />';
//}
//
//server.render(imgOptions, chartOptions, generateImgTag);

//server = http.createServer(function (req, res) {
//    rpmCounter++;
//    console.log("Request: " + req.url);
//
//    if (req.url == "/index.html") {
//        fs.readFile("index.html", function (err, text) {
//            res.setHeader("Content-Type", "text/html");
//            res.end(text);
//        });
//        return;
//    }
//
//    res.setHeader("Content-Type", "text/html");
//    res.end("<p>Hello World. Request rpmCounter: " + rpmCounter + ".</p>");
//});
//console.log('Server running at http://127.0.0.1:3000/');
//server.listen(port, serverUrl);

var io = require('socket.io').listen(3001);

io.sockets.on('connection', function (socket) {
    socket.on("connect", function () {
        console.log("Connected!");
    });
    socket.on('disconnect', function () { });
});

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

        v4 = 0, v5 = 0;
        for(i=3; i< p.length; i+=16){
            sample_value = ((parseInt(p[i]) * 256) + parseInt(p[i+1]) -512) * Math.pow(10, -6);
            console.log(sample_value);
        }

        //for(i=4; i< p.length; i+=16){
        //    v5 += parseInt(p[i]);
        //}
        //sample_value = ((v4 * 256) + v5 -512) * Math.pow(10, -6);
        //
        //console.log(sample_value);

        p.length = 0;

        dataArr.length = 0;
        j = 0;
        eegModule.close();
    }

});

//var SerialPort = require("serialport");
//var bs = 256*17;
//
//var eegModule = new SerialPort.SerialPort('/dev/ttyUSB0', {baudrate: 57600},{buffersize: bs}, {
//    parser: SerialPort.parsers.readline('\n')
//});
//
//var j=0;
//var p = new Array();
//
//eegModule.on('data', function(data) {
//    if(j < bs){
//        if (data.length > 0) {
//            if( j+data.length < bs){
//                for (i = 0; i < data.length; i++) {
//                    p.push(data[i].toString());
//                }
//                j+=data.length;
//            }
//            else{
//                j = bs;
//            }
//        }
//    }
//    else{
//        var tmp = 17;
//        var idx = 0;
//        var dataArr = new Array();
//        var sample_value = 0;
//
//        for(z = 0; z< p.length; z++){
//            if(p[z] == 90 && p[z+16] == 165){
//                tmp = 0;
//            }
//            if(tmp < 17){
//                process.stdout.write(p[z].toString() + " ");
//                dataArr.push(p[z]);
//            }
//            tmp++;
//            if(tmp == 17){
//                process.stdout.write("\n");
//            }
//
//            //if(p[z] == 90){
//            //    idx = z;
//            //    tmp = p[z];
//            //}
//            //if(tmp == 90){
//            //    //process.stdout.write(p[z].toString() + " ");
//            //    // if(p[idx+16] == 165)
//            //    dataArr.push(p[z]);
//            //}
//            //if(p[z] == 165 && p[z+1] == 90){
//            //    tmp = p[z];
//            //    //process.stdout.write("\n");
//            //}
//        }
//        console.log("\n");
//
//        v4 = 0, v5 = 0;
//        for(i=3; i< p.length; i+=16){
//            v4+=parseInt(p[i]);
//        }
//
//        for(i=4; i< p.length; i+=16){
//            v5 += parseInt(p[i]);
//        }
//        sample_value = ((v4 * 256) + v5 -512) * Math.pow(10, -6);
//
//        console.log(sample_value);
//
//        p.length = 0;
//
//        //tmp = 17;
//        //var sample_value;
//        //for(i = 0; i<dataArr.length; i++){
//        //    //process.stdout.write(dataArr[i].toString() + " ");
//        //
//        //    if(dataArr[i] == 90 && dataArr[i+16] == 165){
//        //        tmp = 0;
//        //    }
//        //
//        //    if(tmp < 17){
//        //        process.stdout.write(dataArr[i].toString() + " ");
//        //    }
//        //    tmp++;
//        //    if(tmp == 17){
//        //        process.stdout.write("\n");
//        //    }
//        //    //if(dataArr[i] == 165 && dataArr[i+1] == 90){
//        //    //    process.stdout.write("\n");
//        //    //}
//        //}
//
//        dataArr.length = 0;
//        j = 0;
//        //eegModule.close();
//    }
//
//});

