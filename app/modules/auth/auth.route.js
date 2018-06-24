(function () {

  'use strict';

  angular.module('pb.ds.home').config(function ($stateProvider) {
    $stateProvider.state('signin', {
      url: '/',
      data: {
        pageTitle: 'Signin | Repute Minder',
        bodyClass: 'signin'
      },
      views: {
        'content': {
          controller: 'SigninController as signin',
          templateUrl: 'modules/auth/templates/signin.html'
        },
      }
    });

    $stateProvider.state('signup', {
      url: '/signup',
      data: {
        pageTitle: 'Signup | Repute Minder',
        bodyClass: 'signin'
      },
      views: {
        'content': {
          controller: 'SignupController as signup',
          templateUrl: 'modules/auth/templates/signup.html'
        }
      }
    });
  });

})();
