angular.module('starter.services', ['ngResource'])

.service('FlyerService', function (PouchDBListener, $resource) {
    var flyers1 = [];

    var addFlyer = function(flyer) {
      flyers1.push(flyer);
      return True
    }

    var deleteFlyer = function(id){
      for(var i = 0; i < flyers1.length; i++) {
          if(flyers1[i]._id === id) {
            flyers1.splice(i, 1);
            return True
          }
      }
    }

    var getFlyers = function(){
      return flyers1;
    }

    var getFlyer = function(id){
      return flyers1[id];
    }

    return {
      addFlyer: addFlyer,
      deleteFlyer: deleteFlyer,
      getFlyers: getFlyers,
      getFlyer: getFlyer
    };
});
