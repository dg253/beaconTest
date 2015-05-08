
var localDB = new PouchDB('beacons');

angular.module('starter.beacons', ['ionic'])

.factory("Beacon", function(){
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

.run(function(Beacon,$ionicPlatform){
	$ionicPlatform.ready(function(){
		
		Beacon.init();
		
	});
})

.controller('BeaconCtrl',function($scope,Beacon){
	
	$scope.phase = 0;
	
	$scope.major = 0;
	$scope.minor = 0;
	$scope.uuid = 0;
	$scope.lat = 0;
	$scope.lon = 0;
	
	$scope.beaconForm = {};
	
	$scope.startScanning = function(){
		$scope.phase = 1;
		Beacon.setCallback($scope.callback);
		Beacon.startRanging();
		
		//Let's get those coordinates
		navigator.geolocation.getCurrentPosition($scope.geoSuccess,$scope.geoFailure);
		
	};
	
	$scope.geoSuccess = function(position){
		console.log("You got it!");
		console.log("LAT: " + position.coords.latitude);
		console.log("LONG: " + position.coords.longitude);
		$scope.lat = position.coords.latitude;
		$scope.lon = position.coords.longitude;
	};
	
	$scope.geoFailure = function(error){
		console.log("Geolocation error");
		console.log("CODE: " + error.code);
		console.log("MESSAGE: " + error.message);
	};
	
	$scope.stopScanning = function(){
		$scope.phase = 0;
		Beacon.stopRanging();
	};
	
	$scope.callback = function(plugin){
		$scope.$apply(function(){
			Beacon.stopRanging();
			$scope.phase = 2;
			$scope.major = plugin.beacons[0].major;
			$scope.minor = plugin.beacons[0].minor;
			$scope.uuid = plugin.beacons[0].uuid;
		});
	};
	
	$scope.foundBeacon = function(){
		console.log("I am the callback!");
		Beacon.stopRanging();
	};
	
	$scope.helloBeaconScanner = function(){
		Beacon.setCallback($scope.foundBeacon);
		Beacon.startRanging();
	};

	$scope.postCreate = function() {
    console.log($scope.beaconForm);
    localDB.post({
      title: $scope.beaconForm.title,
      owner: $scope.beaconForm.owner,
      uuid: $scope.uuid,
      major: $scope.major,
      minor: $scope.minor,
      dateAdded: $scope.beaconForm.dateAdded,
      description: $scope.beaconForm.description,
      lat: $scope.lat,
      lon: $scope.lon,
      image: $scope.beaconForm.imageURL,
      brand: $scope.beaconForm.brand,
      oPrice: $scope.beaconForm.oPrice,
      dPrice: $scope.beaconForm.dPrice
    });
    console.log('complete adding');
  	};

});

