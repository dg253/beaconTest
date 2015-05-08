angular.module('starter.controllers', ['starter.services'])

.controller('AppCtrl', function($scope, $ionicModal, $timeout, $ionicLoading, Beacon) {

  localDB.sync(remoteDB, {live: true, retry: true})
    .on('error', function (err) {
        console.log("Syncing stopped in AppCtrl");
        console.log(err);
      })
    .on('paused', function () {
        console.log("Syncing paused in AppCtrl");
    })
    .on('active', function () {
        console.log("active in AppCtrl");
    })
    .on('denied', function (info) {
        console.log("User denied in AppCtrl");
        console.log(info);
    });

  $scope.phase = 0;

	$scope.major = 0;
	$scope.minor = 0;
	$scope.uuid = 'blank';
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
			$scope.uuid = String(plugin.beacons[0].uuid);
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

  $scope.postCreate1 = function() {
    $ionicLoading.show({
	    content: 'Hi. Oh yeah, we are working on your request',
	    animation: 'fade-in',
	    showBackdrop: true,
	    maxWidth: 200,
	    showDelay: 500,
      duration: 1000
	  });
    localDB.post({
      title: $scope.beaconForm.title,
      owner: $scope.beaconForm.owner,
      uuid: $scope.uuid,
      major: $scope.major,
      minor: $scope.minor,
      dateAdded: $scope.beaconForm.dateAdded = new Date(),
      description: $scope.beaconForm.description,
      lat: $scope.lat,
      lon: $scope.lon,
      image: $scope.beaconForm.imageURL,
      brand: $scope.beaconForm.brand
    });
    $scope.closeSmartphoneBeaconOptions();
    loadingIndicator.hide();
    $scope.lat = 0;
    $scope.lon = 0;
    $scope.uuid = "blank";
    $scope.phase = 0;
  };

  $scope.deviceInformation = ionic.Platform.platform();
  console.log('deviceInformation?')
  console.log($scope.deviceInformation)

  $scope.isWebView = ionic.Platform.isWebView();
  console.log('isWebView?')
  console.log($scope.isWebView)
  $scope.isIPad = ionic.Platform.isIPad();
  console.log('isIPad?')
  console.log($scope.isIPad)
  $scope.isIOS = ionic.Platform.isIOS();
  console.log('isIOS?')
  console.log($scope.isIOS)
  $scope.isAndroid = ionic.Platform.isAndroid();
  console.log('isAndroid?')
  console.log($scope.isAndroid)
  $scope.isWindowsPhone = ionic.Platform.isWindowsPhone();
  console.log('isWindowsPhone?')
  console.log($scope.isWindowsPhone)

  $scope.currentPlatform = ionic.Platform.platform();
  console.log('currentPlatform?')
  console.log($scope.currentPlatform)

  $scope.isMobile = $scope.isIOS || $scope.isAndroid
  console.log('isMobile?')
  console.log($scope.isMobile)

  // Create the Smartphone beacon options modal that we will use later
  $ionicModal.fromTemplateUrl('templates/beaconScan.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modal2 = modal;
  });

  // Triggered in the Smartphone beacon options modal to close it
  $scope.closeSmartphoneBeaconOptions = function() {
    $scope.modal2.hide();
  };

  // Open the Smartphone beacon options modal
  $scope.smartPhoneBeaconOptions = function() {
    $scope.modal2.show();
  };

  // Form data for the login modal
  $scope.loginData = {};

  $scope.beaconForm = {};

  // Create the beacon options modal that we will use later
  $ionicModal.fromTemplateUrl('templates/browse.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modal1 = modal;
  });

  // Triggered in the beacon options modal to close it
  $scope.closeBeaconOptions = function() {
    $scope.modal1.hide();
  };

  // Open the beacon options modal
  $scope.beaconOptions = function() {
    $scope.modal1.show();
  };

  $scope.postCreate = function() {
    $ionicLoading.show({
	    content: 'Hi. Oh yeah, we are working on your request',
	    animation: 'fade-in',
	    showBackdrop: true,
	    maxWidth: 200,
	    showDelay: 500,
      duration: 1300
	  });
    localDB.post({
      title: $scope.beaconForm.title,
      owner: $scope.beaconForm.owner,
      uuid: $scope.beaconForm.uuid,
      major: $scope.beaconForm.major,
      minor: $scope.beaconForm.minor,
      dateAdded: $scope.beaconForm.dateAdded = new Date(),
      description: $scope.beaconForm.description,
      location: $scope.beaconForm.location,
      image: $scope.beaconForm.imageURL,
      brand: $scope.beaconForm.brand
    });

    $scope.closeBeaconOptions();
    loadingIndicator.hide();
  };

  //Cleanup the modal when we're done with it!
  $scope.$on('$destroy', function() {
    $scope.modal1.remove();
  });
  // Execute action on hide modal
  $scope.$on('modal1.hidden', function() {
    // Execute action
  });
  // Execute action on remove modal
  $scope.$on('modal1.removed', function() {
    // Execute action
  });

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  //Cleanup the modal when we're done with it!
  $scope.$on('$destroy', function() {
    $scope.modal.remove();
  });

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };

  $scope.fbLogin = function() {
    openFB.login(
        function(response) {
            if (response.status === 'connected') {
                console.log('Facebook login succeeded');
                $scope.closeLogin();
            } else {
                alert('Facebook login failed');
            }
        },
        {scope: 'email'});
  };

  $scope.delete = function(flyer) {
    localDB.get(flyer._id, function (err, doc) {
      localDB.remove(doc, function (err, res) {});
    });
  };

})

.controller('FlyersCtrl', function($scope, FlyerService, PouchDBListener) {
    $scope.$root.enableRight = false;

    $scope.$on('$stateChangeStart', function() {
        $scope.$root.enableRight = true;
    });

    $scope.shouldShowDelete = false;
    $scope.shouldShowReorder = false;
    $scope.listCanSwipe = true;

    $scope.flyers = FlyerService.getFlyers();

    $scope.$on('add', function(event, flyer) {
      for (var i = 0; i < $scope.flyers.length; i++) {
        if ($scope.flyers[i]._id === flyer._id) {
          console.log('on add received UPDATE')
          return FlyerService.updateFlyer(flyer, i);
        }
      }
      console.log('on add received ADD')
      return FlyerService.addFlyer(flyer);
    });

    $scope.$on('delete', function(event, id) {
      console.log('a DELETE caught')
      return FlyerService.deleteFlyer(id);
    });
})

.controller('FlyerCtrl', function($scope, FlyerService, $stateParams) {
    $scope.flyer = FlyerService.getFlyer($stateParams.flyerId)
    $scope.flyerCopy = angular.copy($scope.flyer)

    $scope.editForm = false;

    $scope.toggleForm = function() {
      $scope.editForm = !$scope.editForm;
    };

    $scope.update = function(flyer) {
      //$scope.flyer = angular.copy(flyer)
      localDB.get(flyer._id, function (err, doc) {
        if (err) {
          console.log(err);
        } else {
          localDB.put(flyer, doc._rev, function (err, res) {
            console.log('sent doc update');
            $scope.toggleForm();
            if (err) console.log(err);
          });
        }
      });
    };
})

.controller('LocalCtrl', function($scope) {
  $scope.hasPermission = function() {
    cordova.plugins.notification.local.hasPermission(function (granted) {
      alert('Permission has been granted: ' + granted);
    });
  };

  $scope.grantPermission = function() {
    cordova.plugins.notification.local.registerPermission(function (granted) {
      alert('Permission has been granted: ' + granted);
    });
  };

  $scope.schedule = function () {
    cordova.plugins.notification.local.schedule({
      id: 1,
      title: 'Regular Local Schedule',
      text: 'Test Message 2',
      sound: null,
      data: { test: id }
    });
  };

  $scope.scheduleDelayed = function () {
    var now = new Date().getTime(),
    _5_sec_from_now = new Date(now + 5 * 1000);
    var sound = device.platform == 'Android' ? 'file://sound.mp3' : 'file://beep.caf';
    cordova.plugins.notification.local.schedule({
      id: 2,
      title: 'Scheduled with delay',
      text: 'Test Message 1',
      at: _5_sec_from_now,
      sound: sound,
      badge: 12
    });
  };
})

.controller('ProfileCtrl', function($scope) {
    openFB.api({
        path: '/me',
        params: {fields: 'id,name'},
        success: function(user) {
            $scope.$apply(function() {
                $scope.user = user;
            });
        },
        error: function(error) {
            alert('Facebook error: ' + error.error_description);
        }
    });
});
