(function () {

  'use strict';

  angular.module('app').controller('HeaderController', function ($log, $state, AuthFactory) {
    var _this = this;

    function init() {
      if(AuthFactory.isAuthenticated()){
        _this.session = true;
        _this.name = sessionStorage.getItem('name');
      }
    }

    init();
    
    _this.logout = function() {
      sessionStorage.clear();
      $state.go('signin', {}, {location: 'replace'})
    }

  });

})();
