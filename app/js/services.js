/**
 * Created by Fernando on 18/03/2015.
 */
'use strict';

var chatRealTimeServices = angular.module('chatRealTimeServices', ['ngResource']);

/* API REST */

/*
chatRealTimeServices.factory('Session', ['$resource',
    function($resource){
        return $resource('/', {}, {
            signIn:						    {method:'POST',params:{token:'token'}},
            logout:						    {method:'DELETE',params:{token:'token',tokenb:'tokenb'}}
        });
    }
]);

*/