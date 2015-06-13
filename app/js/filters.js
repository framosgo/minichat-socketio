/**
 * Created by Fernando on 18/03/2015.
 */
'use strict';

/* Filters */

var chatRealTimeFilters = angular.module('chatRealTimeFilters', []);

chatRealTimeFilters.filter('timeFormat', function(){
    return function(date){
        return moment(date).format('DD/MM/YYYY HH:mm');
    };
});

chatRealTimeFilters.filter('durationFormat', function(){
    return function(day){
        var result = '';
        var values = {
            ' year': 365,
            ' month': 30,
            ' day': 1
        };
        if(moment.locale()=='es'){
            values = {
                ' año': 365,
                ' mes': 30,
                ' día': 1
            };
        }

        for (var x in values) {
            var amount = Math.floor(day / values[x]);

            if (amount >= 1) {
                var aux = 's';
                if(amount>1 && x==' mes' && moment.locale()=='es'){
                    aux = 'es';
                }
                result += amount + x + (amount > 1 ? aux : '') + ' ';
                day -= amount * values[x];
            }
        }

        return result;
    };
});

chatRealTimeFilters.filter('cut', function () {
    return function (value, wordwise, max, tail) {
        if (!value) return '';

        max = parseInt(max, 10);
        if (!max) return value;
        if (value.length <= max) return value;

        value = value.substr(0, max);
        if (wordwise) {
            var lastspace = value.lastIndexOf(' ');
            if (lastspace != -1) {
                value = value.substr(0, lastspace);
            }
        }

        return value + (tail || ' …');
    };
});