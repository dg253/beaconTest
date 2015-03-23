angular.module('starter.services', ['ngResource'])

.factory('Flyer', function ($resource) {
    return $resource('http://localhost:5000/flyers/:flyerId');
});