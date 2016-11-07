(function() {
  'use strict';

  angular.module('app')
    .controller('AppCtrl', AppCtrl)

  AppCtrl.$inject = [
    'PatternUnlockService'
  ];

  function AppCtrl(PatternUnlockService) {
    var vm = this;

    vm.greeting = 'Hello world';

    vm.unlock = function() {
      PatternUnlockService.unlock();
    }
    vm.unlock();
  }
})();
