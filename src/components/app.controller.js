(function() {
  'use strict';

  angular.module('app')
    .controller('AppCtrl', AppCtrl)

  AppCtrl.$inject = [
    'PatternUnlockService',
    '$state'
  ];

  function AppCtrl(PatternUnlockService, $state) {
    var vm = this;

    vm.greeting = 'Hello world';

    vm.reset = function() {
      PatternUnlockService.reset();
    }

    vm.unlock = function() {
      PatternUnlockService.unlock()
        .then(function() {// Success
          $state.go('app.unlock');
        });
    }
  }
})();
