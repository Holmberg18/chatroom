var socket_io = require('socket.io');
var http = require('http');
var express = require('express');

var app = express();
app.use(express.static('public'));

var server = http.Server(app);
var io = socket_io(server);

var users= {};

io.on('connection', function (socket) {
    
    users[socket.id] = "";
    io.sockets.emit("message","There are " +Object.keys(users).length+ " users in the room");//all others and this connection
    
    socket.on('nickname', function(nickname){
       users[socket.id] = nickname; 
       socket.broadcast.emit("message", users[socket.id] + " has joined the room");//broadcasting to all others
    });
    
    console.log('Client connected');
    
    

    socket.on('message', function(message) {
        console.log('Received message:', message);
        socket.broadcast.emit('message', users[socket.id]+ ": "+message);
    });
    
    socket.on('disconnect', function(){
    delete users[socket.id];
    socket.broadcast.emit("message","There are " +Object.keys(users).length+ " users in the room");
    var endUser = "User disconnected";
    console.log(""+endUser);
    socket.broadcast.emit("message",endUser);
    
});
});

// io.sockets.on('connection',function(socket){ 
//     io.sockets.sockets['nickname'] = socket.id;
//     client.on("chat", function(data) {      
//         var sock_id = io.sockets.sockets['nickname']
//         io.sockets.sockets[sock_id].emit("private", "message");
//     });    
// });

// var clients = io.sockets.clients();
// var clients = io.sockets.clients('room');
// console.log(io.sockets.manager.server.connections);

// io.sockets.sockets.map(function(e) {
//     return e.username;
// })

server.listen(process.env.PORT || 8080);



// io.sockets.connected //Return {socket_1_id: {}, socket_2_id: {}} . This is the most convenient one, since you can just refer to io.sockets.connected[id] then do common things like emit()
// io.sockets.sockets //Returns [{socket_1}, {socket_2}, ....]. Can refer to socket_i.id to distinguish
// io.sockets.adapter.sids //Return {socket_1_id: {}, socket_2_id: {}} . Looks similar to the first one but the object is not actually the socket, just the information.

// // Not directly helps but still relevant
// io.sockets.adapter.rooms //Returns {room_1_id: {}, room_2_id: {}}
// io.sockets.server.eio.clients //Return client sockets
// io.sockets.server.eio.clientsCount //Return number of connected clients