angular.module('starter.services', ['ngResource'])

.factory('Flyer', function ($resource) {
    return $resource('http://localhost:8080/flyers/:flyerId');
});