angular.module('starter.controllers', ['starter.services'])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {
  // Form data for the login modal
  $scope.loginData = {};

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
    $scope.closeBeaconOptions();
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

.controller('FlyersCtrl', function($scope, Flyer) {
    $scope.flyers = Flyer.query();
})

.controller('FlyerCtrl', function($scope, $stateParams, Flyer) {
    $scope.flyer = Flyer.get({flyerId: $stateParams.flyerId});
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