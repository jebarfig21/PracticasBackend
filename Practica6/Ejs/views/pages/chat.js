    var socket = io();
    $('form').submit(function(){
        var msg = $('#message').val();
        if(msg.length > 0)
            socket.emit('chat message', msg);
        else
            console.log("Enter a valid msg :)");
        $('#message').val("");
        return false;
    });

    socket.on('chat message', function(msg){
        $("#messages").append('<li class="list-group-item">'+msg+'</li>');
    });
