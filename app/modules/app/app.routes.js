(function () {

  'use strict';

  angular.module('pb.ds.home').config(function ($stateProvider) {
    $stateProvider.state('home', {
      url: '/home',
      data: {
        pageTitle: 'Repute Minder',
        access: 'private',
        bodyClass: 'home'
      },
      views: {
        'header': {
          controller: 'HeaderController as header',
          templateUrl: 'modules/main/templates/header.html'
        },
        'content': {
          controller: 'CompanyController as companyCtrl',
          templateUrl: 'modules/app/templates/company.html'
        },
        'footer': {
          controller: 'FooterController as footer',
          templateUrl: 'modules/main/templates/footer.html'
        }
      }
    });
    });
    
})();


