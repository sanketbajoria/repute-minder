(function () {

  'use strict';

  angular.module('pb.ds.home').controller('SigninController',
    function ($log, $uibModal, AppFactory, $state, $stateParams, AuthFactory) {
      if(AuthFactory.isAuthenticated()){
        $state.go('home', {}, {location: 'replace'})
      }

      var _this = this;
      _this.data = {};
      _this.invalidPassword = false;
      _this.login = function (a) {
        if (!_this.data.email || !_this.data.password) {
          return;
        }
        console.log(_this.data);
        AuthFactory.login(_this.data).then(function () {
          $state.go('home');
        }).catch(function () {
          _this.invalidPassword = true;
        });
      }

      _this.gotoSignup = function () {
        $state.go('signup', $stateParams);
      }

    });

  angular.module('pb.ds.home').controller('SignupController',
    function ($log, $uibModal, AppFactory, $state, AuthFactory, $stateParams) {

      var _this = this;
      _this.data = {};
      _this.signup = function() {
        // delete angular.copy(_this.data.confirmPassword);
        AuthFactory.createUser(_this.data).then(function(user) {
          // if ($stateParams.refapp) {
            AuthFactory.login({email: _this.data.email, password: _this.data.password}).then(function() {
              $state.go('home');
            });
          // } else {

          // }
        }).catch(function(){
          _this.duplicateEmail = true;
        });
      }


    });

})();
