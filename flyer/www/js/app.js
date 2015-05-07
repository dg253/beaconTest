// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js

var localDB = new PouchDB('beacons');
var remoteDB = new PouchDB('http://54.149.42.95:5984/beacons');

angular.module('starter', ['ionic', 'starter.controllers'])

.run(function(Beacon, $ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(false);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }

    cordova.plugins.Keyboard.disableScroll(true);

    Beacon.init();
  });
})

.factory('PouchDBListener', ['$rootScope', function($rootScope) {
  localDB.changes({
        live: true,
        continuous: true,
        onChange: function(change) {
            if (!change.deleted) {
                $rootScope.$apply(function() {
                    localDB.get(change.id, function(err, doc) {
                        $rootScope.$apply(function() {
                            if (err) console.log(err);
                            $rootScope.$broadcast('add', doc);
                        })
                    });
                })
            } else {
                $rootScope.$apply(function() {
                    $rootScope.$broadcast('delete', change.id);
                });
            }
        }
    });

    return true;

}])

.factory('Beacon', function($rootScope){
	var beacon = {};

	beacon.beaconRegion = null;
	beacon.delegate = null;

	beacon.uuid = "2F234454-CF6D-4A0F-ADF2-F4911BA9FFA6";
	beacon.identifier = "flyer";
	beacon.major = 1;
	beacon.minor = 1;

	//------------------------------------------------------

	beacon.callback = function(){
		console.log("No callback defined!");
	};

	beacon.setCallback = function(cb){
		beacon.callback = cb;
	};

	//------------------------------------------------------

	beacon.init = function(){
		beacon.delegate = new cordova.plugins.locationManager.Delegate();

		beacon.delegate.didRangeBeaconsInRegion = function(pluginResult){
			beacon.didRangeBeaconsInRegion(pluginResult);
		};

		beacon.delegate.didEnterRegion = function(pluginResult){
			beacon.didEnterRegion(pluginResult);
		};

		beacon.delegate.didExitRegion = function(pluginResult){
			beacon.didExitRegion(pluginResult);
		};

		beacon.delegate.didDetermineStateForRegion = function(pluginResult){
			beacon.didDetermineStateForRegion(pluginResult);
		};
	};

	beacon.helloWorld = function(){
		console.log("HELLO WORLD! It\'s me, Beacon Scanner! :)");
	};

	//------------------------------------------------------

	beacon.startRanging = function(plugin){
		var beaconRegion = new cordova.plugins.locationManager.BeaconRegion(beacon.identifier,beacon.uuid);
		cordova.plugins.locationManager.setDelegate(beacon.delegate);
		//For iOS 8+ punks
		cordova.plugins.locationManager.requestWhenInUseAuthorization();

		cordova.plugins.locationManager.startRangingBeaconsInRegion(beaconRegion)
		  .fail(console.error)
		  .done();

		  console.log("I\'m looking for: " + beacon.uuid);
	};

	beacon.stopRanging = function(plugin){
		var beaconRegion = new cordova.plugins.locationManager.BeaconRegion(beacon.identifier,beacon.uuid,beacon.major,beacon.minor);

		cordova.plugins.locationManager.stopRangingBeaconsInRegion(beaconRegion)
		  .fail(console.error)
		  .done();

		  console.log("I stopped ranging for beacons.");
	};

	//------------------------------------------------------

	beacon.getStatus = function(){
		return beacon.status;
	};

	//------------------------------------------------------

	beacon.didEnterRegion = function(plugin){
		console.log("Hello, from beacon!");
	};

	beacon.didExitRegion = function(plugin){
		console.log("Goodbye, from beacon!");
	};

	beacon.didRangeBeaconsInRegion = function(plugin){
		console.log(JSON.stringify(plugin));
		for(b in plugin.beacons){
			if(beacon.processBeacon(plugin.beacons[b])){
				console.log("Found it!");
				beacon.callback(plugin);
			}
		}
	};

	beacon.didDetermineStateForRegion = function(plugin){
		console.log("Which event was this again...?");
	};

	//------------------------------------------------------

	beacon.processBeacon = function(b){
		/*
		 * We know that most likely we are only searching for a very specific beacon, so just grab
		 * the first one found with an immediate proximity
		 */

		console.log("I AM BEACON " + JSON.stringify(b));

		if(b.proximity == "ProximityImmediate"){
			return true;
		}

		return false;
	};

	//------------------------------------------------------

	beacon.setUUID = function(uuid){
		beacon.uuid = uuid;
	};

	beacon.setMajor = function(major){
		beacon.major = major;
	};

	beacon.setMinor = function(minor){
		beacon.minor = minor;
	};

	return beacon;
})

.config(function($stateProvider, $urlRouterProvider) {
  openFB.init({appId: '1630742683822336'});

  $stateProvider

  .state('app', {
    url: "/app",
    abstract: true,
    templateUrl: "templates/menu.html",
    controller: 'AppCtrl'
  })

  .state('app.search', {
    url: "/search",
    views: {
      'menuContent': {
        templateUrl: "templates/search.html"
      }
    }
  })

  .state('app.browse', {
    url: "/browse",
    views: {
      'menuContent': {
        templateUrl: "templates/browse.html"
      }
    }
  })

  .state('app.profile', {
    url: "/profile",
    views: {
      'menuContent' :{
        templateUrl: "templates/profile.html",
        controller: "ProfileCtrl"
      }
    }
  })

  .state('app.local', {
    url: "/local",
    views: {
      'menuContent': {
        templateUrl: "templates/local.html",
        controller: 'LocalCtrl'
      }
    }
  })

  .state('app.flyers', {
    url: "/flyers",
    views: {
      'menuContent': {
        templateUrl: "templates/flyers.html",
        controller: 'FlyersCtrl'
      }
    }
  })

  .state('app.flyer', {
    url: "/flyers/:flyerId",
    views: {
      'menuContent': {
        templateUrl: "templates/flyer.html",
        controller: 'FlyerCtrl'
      }
    }
  });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/flyers');
});
