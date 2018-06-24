(function () {

  'use strict';

  angular.module('app').factory('AppFactory', function ($http) {

    return {
      updateFreshDesk: function(data) {
        return $http.put('/api/v1/users/freshdesk', {email: sessionStorage.getItem('email'), freshdesk: JSON.stringify(data)});
      },
      getFreshDesk: function() {
        return $http.get('/api/v1/users/freshdesk',  { params: {email: sessionStorage.getItem('email')}}).then(function(u){
          if(u && u.data.freshdesk){
            return JSON.parse(u.data.freshdesk);
          }
        });
      }
    };
  });

})();
