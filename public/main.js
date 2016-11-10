jQuery(document).ready(function() {
    
    var socket = io();
    var input = jQuery('input');
    var messages = jQuery('#messages');

    var input = jQuery('input');
    var messages = jQuery('#messages');

    var addMessage = function(message) {
        messages.append('<div>' + message + '</div>');
    };
    
    socket.on('connect', function(){
    var newUser = "User connected"
    console.log(""+newUser);
    addMessage(newUser);
});


   input.on('keydown', function(event) {
    if (event.keyCode != 13) {
        return;
    }

    var message = input.val();
    addMessage(message);
    socket.emit('message', message);
    input.val('');
});

socket.on('connect', function(){
    console.log("User connected");
});

socket.on('message', addMessage);

socket.on('disconnect', function(){
    var endUser = "User disconnected"
    console.log(""+endUser);
    addMessage(endUser);
});

});

 