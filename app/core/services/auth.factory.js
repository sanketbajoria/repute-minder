(function () {

    'use strict';

    angular.module('app').factory('AuthFactory', function ($http, $location) {
        var attemptedUrl = '';
        return {
            login: function (data) {
                return $http.post('/api/v1/login', data).then(function(res) {
                    sessionStorage.setItem('session', true);
                    sessionStorage.setItem('name', res.data.name);
                    sessionStorage.setItem('email', res.data.email);
                    return res.data;
                });
            },

            createUser: function(data) {
                return $http.post('/api/v1/users', data);
            },

            logout: function () {
                sessionStorage.clear();
            },

            saveAttemptedUrl: function (url) {
                attemptedUrl = url;
            },

            isAuthenticated: function(){
                var name = sessionStorage.getItem("name");
                var email = sessionStorage.getItem("email")
                var session = (sessionStorage.getItem("session") === 'true');
                return (session && name && email);
            },

            redirectToAttemptedUrl: function () {
                if (attemptedUrl == '') {
                    return;
                }
                var url = attemptedUrl;
                attemptedUrl = '';
                $location.path = url;
            }
        };
    });

})();
