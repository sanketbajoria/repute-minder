(function () {

  'use strict';

  angular.module('pb.ds.home').controller('CompanyController',
    function (AuthFactory, AppFactory, $state, $timeout) {
      var vm = this;

      vm.registered = false;
      vm.data = {
        keywords: [],
        negativity: 40,
        viewCounts: 1,
        upvotes: 1
      }

      if(!AuthFactory.isAuthenticated()){
        $state.go('signin', {}, {location: 'replace'})
      }else{
        AppFactory.getFreshDesk().then(function (f){
          if(f){
            vm.registered = true;
            vm.data = f;
          }
        })
      }

      vm.save = function(){
        vm.data.registered = vm.registered;
        AppFactory.updateFreshDesk(vm.data).then(function(f) {
          if(f){
            vm.registered = true;
            vm.successMsg = "Saved successfully"
            $timeout(function(){
              vm.successMsg = "";
            }, 5000)
          }
        }).catch(function (err){
          vm.errorMsg = err.data;
            $timeout(function(){
              vm.errorMsg = "";
            }, 5000)
        });
      }

    });


})();
