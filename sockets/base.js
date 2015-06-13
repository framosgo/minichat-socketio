/**
 * Created by Renato on 21/04/2015.
 */
module.exports = function (io) {
    'use strict';

    var usersOnline = [];
    io.on('connection', function(socket){

        var id = socket.id;

        socket.on('user connected', function(user){
            var userConnected = {
                id : id,
                nickname : user
            };
            usersOnline.push(userConnected);
            console.log(usersOnline);
            io.emit('user connected', user);
        });

        socket.on('chat message', function(msg){
            io.emit('chat message', msg);
        });

        socket.on('num users', function(){
            io.emit('num users', usersOnline.length);
        });

        socket.on('disconnect', function(){
            var user = 'Anonymous';
            for(var i=0; i<usersOnline.length; i++){
                if(usersOnline[i].id == socket.id){
                    user = usersOnline[i].nickname;
                    usersOnline.splice(i,1);
                    break;
                }
            }

            io.emit('message disconnected', user + ' ha dejado la sala.');
        });
    });
};