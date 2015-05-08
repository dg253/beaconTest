angular.module('starter.services', ['ngResource'])

.service('FlyerService', function (PouchDBListener) {
    var flyers1 = [];

    var addFlyer = function(flyer) {
      flyers1.push(flyer)
      console.log('confirmed push')
    }

    var updateFlyer = function(flyer, i) {
      flyers1[i] = flyer;
      console.log('confirmed update')
    }

    var deleteFlyer = function(id){
      for(var i = 0; i < flyers1.length; i++) {
          if(flyers1[i]._id === id) {
            console.log('confirmed deletion')
            flyers1.splice(i, 1);
          }
      }
    }

    var getFlyers = function(){
      console.log('just returned all flyers')
      return flyers1;
    }

    var getFlyer = function(flyerId){
      for(var i = 0; i < flyers1.length; i++) {
          if(flyers1[i]._id === flyerId) {
            console.log('just returned a flyer')
            return flyers1[i];
          }
      }
    }

    return {
      addFlyer: addFlyer,
      updateFlyer: updateFlyer,
      deleteFlyer: deleteFlyer,
      getFlyers: getFlyers,
      getFlyer: getFlyer
    };
});
