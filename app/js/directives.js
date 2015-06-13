/**
 * Created by Fernando on 18/03/2015.
 */
'use strict';

var chatRealTimeDirectives = angular.module('chatRealTimeDirectives', []);

chatRealTimeDirectives.directive('timeago', function() {
    return {
        restrict:'A',
        link: function(scope, element, attrs){
            attrs.$observe("timeago", function(){
                element.text(moment(attrs.timeago).fromNow());
            });
        }
    };
});