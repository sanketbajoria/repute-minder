(function () {

  'use strict';

  angular.module('app').controller('AppController', function ($rootScope, $state) {

    $rootScope.$state = $state;
    $rootScope.sessionData = {};
    $rootScope.sessionData.tokenInvalid = false;

  });


})();
