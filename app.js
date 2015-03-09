var net = require('net');
var express = require('express');
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io').listen(http);
app.use(express.static(__dirname + '/public')); //Public folder

//Variables
var PORT = 3000;
var IP = '127.0.0.1';
var webPORT = 2999;
var websocket, csocket;
var client = new net.Socket();

process.on('uncaughtException', function (err) {
    if (err.message == "connect ECONNREFUSED") {
        console.log('No connection could be made');
    }
    else {
        console.log('Error: ', err.message);
    }
});

//Connecting Node to C# (NET)
connectToTCP = function (){
    try {
        client.connect(3000, 'localhost', function(err){
            console.log('TCP connected');
            client.on('data', function(data){
                console.log(bytesToString(data));
                sendToWeb(websocket, bytesToString(data));
            });

            client.on('error', function(err){
                console.log("Error: "+err.message);
            });
        });
    }
    catch(err) {
        console.log(err);
    }
};

//Connecting Node to HTML (Socket.IO)
io.on('connection', function(socket){
    websocket = socket; //Globally use the socket
    console.log('connected to web');
    socket.on('data', function(data){
        console.log('web message: '+  data);
    });
    socket.on('go', function(data) {
        //connectToTCP();
        console.log('sup');
    });

    socket.on('tryConnect', function() {
       connectToTCP();
    });
});

//Express routing
app.get('/', function(req, res){
    res.sendFile(__dirname + '/public/Simulator.html');
});

//Express listener
http.listen(webPORT, IP, function(){
    console.log('listening on '+IP+':'+ webPORT);
});

sendToWeb = function(websocket, data){
    websocket.emit('data', data.toString());
    console.log('forwarding: ' + data);
};

sendToC = function(socket, data){
    socket.emit('data', data);
};

//Convert bytes[] to string
bytesToString= function(bytes) {
    var result = "";
    for (var i = 0; i < bytes.length; i++) {
        result+= bytes[i].toString();
    }
    return result;
};

//Convert a string to bytes[]
stringToBytes = function(string) {
    var bytes = [];
    for (var i = 0; i < string.length; i++) {
        bytes.push(string.charCodeAt(i).toString());
    }
    return bytes;
};





//Server
////C# connection
//net.createServer(function(sock){
//    console.log('NET listening');
//    csocket = sock;
//    sock.on('data', function(data){
//        sendToWeb(websocket, bytesToString(data));
//    });
//
//    sock.on('error', function(err){
//        console.log('Error: ' + err);
//    });
//}).listen(PORT, IP);






