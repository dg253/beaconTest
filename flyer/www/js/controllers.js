angular.module('starter.controllers', ['starter.services'])

.controller('AppCtrl', function($scope, $ionicModal, $timeout, Beacon) {

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
  // Form data for the login modal
  $scope.loginData = {};

  $scope.beaconForm = {};
  $scope.beaconForm.dateAdded = new Date();

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
    localDB.post({
      title: $scope.beaconForm.title,
      owner: $scope.beaconForm.owner,
      uuid: $scope.beaconForm.uuid,
      major: $scope.beaconForm.major,
      minor: $scope.beaconForm.minor,
      dateAdded: $scope.beaconForm.dateAdded,
      description: $scope.beaconForm.description,
      location: $scope.beaconForm.location,
      image: $scope.beaconForm.imageURL,
      brand: $scope.beaconForm.brand
    });
    console.log('succesful post of:')
    $scope.closeBeaconOptions()
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
      console.log('a ADD caught')
      FlyerService.addFlyer(flyer);
    });

    $scope.$on('delete', function(event, id) {
      console.log('a DELETE caught')
      FlyerService.deleteFlyer(id);
    });

    $scope.delete = function(task) {
      localDB.get(task._id, function (err, doc) {
        localDB.remove(doc, function (err, res) {});
      });
    };
})

.controller('FlyerCtrl', function($scope, FlyerService, $stateParams) {
    $scope.flyer = FlyerService.getFlyer($stateParams.flyerId)
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
})
