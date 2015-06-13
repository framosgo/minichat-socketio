/**
 * Created by Fernando on 18/03/2015.
 */
'use strict';

var chatRealTimeControllers = angular.module('chatRealTimeControllers', []);

chatRealTimeControllers.controller('MainCtrl', ['$scope','$location','$cookieStore', function($scope,$location,$cookieStore) {

    // If you have already a nickname, you can go to chat room.
    if($cookieStore.get('nickname') != null){
        $location.path('/chat');
    }

}]);

chatRealTimeControllers.controller('LoginCtrl', ['$scope','$cookieStore','$location', function($scope,$cookieStore,$location) {

    $scope.nickname = '';

    $scope.login = function(){
        if($scope.nickname==''){
            //TODO "Please introduce a nickname."
        }else{
            // save the nickname
            $cookieStore.put('nickname',$scope.nickname);
            $location.path('/chat');
        }
    }

}]);

chatRealTimeControllers.controller('ChatCtrl', ['$scope','$cookieStore', function($scope,$cookieStore) {

    $scope.nickname = $cookieStore.get('nickname');
    $scope.message = '';
    $scope.numUsers = 0;

    var socket = io();

    socket.emit('user connected', $scope.nickname);

    socket.emit('num users');

    socket.on('num users', function(num){
        $('#numUsers').text(num + ((num>1) ? ' usuarios conectados.': ' usuario conectado.'));
        $scope.numUsers = num;
    });

    socket.on('user connected', function(nick){
        $('#messages').append($('<li>').text(nick + ' conectado'));
    });

    $scope.chatSend = function(){
        socket.emit('chat message', $scope.nickname + ": " + $scope.message);
        $scope.message = '';
    };

    socket.on('chat message', function(msg){
        $('#messages').append($('<li>').text(msg));
    });

    socket.on('message disconnected', function(msg){
        $('#messages').append($('<li>').text(msg));
        $scope.numUsers--;
        $('#numUsers').text($scope.numUsers + (($scope.numUsers>1) ? ' usuarios conectados.': ' usuario conectado.'));
    });

}]);

chatRealTimeControllers.controller('DiceCtrl', ['$scope','$cookieStore', function($scope,$cookieStore) {

    var randomNumber = function(low, high) {
        return Math.floor( Math.random() * (1 + high - low) ) + low;
    };

    var cube = document.getElementById('cube'),
        outcome = document.getElementById('outcome'),
        outcomeText = document.getElementById('text'),
        messageDelay, //timer
        fadeout, //timer
        messages = [
            'Pifia!',
            'You smote the orc',
            'You escaped the Ice Dragon',
            'Lightning Bolt succeeded',
            'Critical hit',
            'You are Lawful Evil',
            'You fell into the Well of Sorrows',
            'You found the Goblet of Endless Grog',
            'You encountered a Harpy',
            'Charisma + 10',
            'You lose 11 Hit Points',
            'You disarmed the trap',
            'Plate Mail + 3',
            '14 Damage',
            'Spell failure',
            'Backstab successful',
            'Your wand broke',
            'Surprise Attack',
            'You broke through the door',
            'Crítico!'
        ];


    var showFace = function () {

        var face = randomNumber( 1, 20 );

        //if not already at this number
        if (cube.className !== 'show-' + face ) {

            cube.className = 'show-' + face;

            //delay for spin to finish
            messageDelay = setTimeout( function() {

                //show message
                outcomeText.innerHTML = messages[ face - 1 ];
                outcome.className = 'show';

                //display message then fade out
                fadeout = setTimeout( function() {

                    //hide message
                    outcome.className = '';

                }, 2000);

            } , 1000);

        } else {
            //repeat number, try again
            return showFace();
        }

    };


    document.getElementById('roll').addEventListener( 'click', function() {

        //fade message
        outcome.className = '';

        //clear timers if they are there
        if ( typeof messageDelay === "number" ) {
            clearTimeout( messageDelay );
            clearTimeout( fadeout );
        }

        showFace();

    }, false);

}]);