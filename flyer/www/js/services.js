angular.module('starter.services', ['ngResource'])

.factory('Flyer', function ($resource) {
    return $resource('http://54.149.42.95:8080/flyers/:flyerId');
});