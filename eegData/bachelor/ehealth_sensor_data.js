/**
 * Created by aleksejs on 16.9.4.
 */

//**Defining constant variables**//
var PATH_TO_OPENTSDB = "/home/aleksejs/opentsdb";
var ACCELEROMETER_DB_NAME = 'accelerometer.data';
var PULSOMETER_DB_NAME = 'pulsometer.data';

//**Initialising HBase Tables**//
InitHBaseTables(PATH_TO_OPENTSDB);

//**Initialising serialport**/
var serialport = require('serialport');
var SerialPort = serialport.SerialPort;
var portName = '/dev/ttyACM0';

var wait = 0;

//**Initialising opentsdb socket**//
var createSocket = require( 'opentsdb-socket' );
var socket = createSocket();
socket.host( '127.0.0.1' );
socket.port( 4242 );
socket.connect();

//**Initialising connection to opentsdb**//
var connection = new SerialPort(portName, {
    baudRate:115200,
    parser:serialport.parsers.readline("\n")
});

//**Checking if connection with Arduino is established**//
connection.on('open', function(){
    console.log("Connected...");
});

connection.on('data', function(data){
    if(wait < 10)
        wait++;
    else{
        //WritePosToDB(GetPositionArray(data));
        console.log(GetPulseDataArray(data)[0] + " " + GetPulseDataArray(data)[1]);
    }
});

function CreateOpenTsdbTable(pathToOpenTSDB, tableName){
    //**Variables to execute shell script**//
    var exec = require('child_process').exec;

    //**It passes table name to the shell script stored in local directory.**//
    var command = "./scripts/create_opentsdb_metrics.sh " + pathToOpenTSDB + " " + tableName;
    exec(command);
}

//**Creating tables for different sensor's metrics**/
function InitHBaseTables(pathToOpenTSDB){
    CreateOpenTsdbTable(pathToOpenTSDB, ACCELEROMETER_DB_NAME);
    CreateOpenTsdbTable(pathToOpenTSDB, PULSOMETER_DB_NAME);
}

function GetPositionArray(data){
    var arr = data.split("|");
    var xyz = new Array(3);
    xyz[0] = arr[0];
    xyz[1] = arr[1];
    xyz[2] = arr[2];
    return xyz;
}

function GetPulseDataArray(data){
    var arr = data.split("|");
    var pulse = new Array(2);
    pulse[0] = arr[4];
    pulse[1] = arr[5];
    return pulse;
}

function WritePosToDB(data) {
    var value = '';
    var now = require('date-now');

    value += 'put ';
    value += ACCELEROMETER_DB_NAME + ' ';
    value += parseInt(Date.now()) + ' ';
    value += parseFloat(data[2]) + ' ';
    value += 'tag=axis_z\n';

    socket.write(value, function ack() {
       console.log('...data written...');
    });
}






