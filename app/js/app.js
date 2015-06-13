/**
 * Created by Fernando on 18/03/2015.
 */
'use strict';

var chatRealTime = angular.module('chatRealTime',[
    'ngRoute',
    'ngCookies',
    'chatRealTimeFilters',
    'chatRealTimeDirectives',
    'chatRealTimeControllers',
    'chatRealTimeServices'
]);

chatRealTime.config(function($routeProvider,$locationProvider){
    $locationProvider.html5Mode(true);
    $routeProvider.
        when('/', {
            templateUrl: 'partials/nonuser/login.html',
            controller: 'LoginCtrl'
        }).
        when('/dice', {
            templateUrl: 'partials/user/dice.html',
            controller: 'DiceCtrl'
        }).
        when('/chat', {
            templateUrl: 'partials/user/chat.html',
            controller: 'ChatCtrl'
        }).

        otherwise({
            redirectTo: '/'
        });
});