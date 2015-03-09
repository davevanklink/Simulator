/**
 * Created by Dave on 19-2-2015.
 */
var socket = io.connect("127.0.0.1:2999");
//Fired up connecting
socket.on('connect', function(){
    socket.emit('go', 'greetings');
    $('.jos').text(socket.connected);
});

socket.on('disconnect', function(){
    $('.jos').text(socket.connected);
   // document.write(socket.connected);
});

//
//socket.on('data', function(data){
//    document.write(data);
//});
//

$('#btn').click(function(){
    socket.emit('tryConnect', 'connect');
});
var offset = $('#testing').offset().top;
var imgW = 1755;
var imgH = 1276;

//Todo
$(document).ready(function(){

    var md = false;
    var x, y;
    $("#testing").mousedown(function (e) {
        md = true;
        x = getCurrentX(e);
        y = getCurrentY(e);
    });

    $("#testing").mousemove(function (e) {
        if (md){
            var hor = x - getCurrentX(e);
            var ver = y - getCurrentY(e);
            var w = $('#testing').width();
            var h = $('#testing').height();
            var hDiff = Math.floor((hor / w) * 100);
            var vDiff = Math.floor((hor / h) * 100);
            $('#testing').css('background-position', -hDiff + '%' + -vDiff+ '%');
        }
    });

    $("#testing").mouseup(function (e) {
        md = false;
    });

});

getCurrentX = function(e) {
    console.log(e.clientX);
    return parseInt(e.clientX);
};

getCurrentY = function(e) {
    return parseInt(e.clientY - offset);
};




