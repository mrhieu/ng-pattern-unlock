(function() {
  'use strict';

  angular.module('app')
    .controller('AppCtrl', AppCtrl)

  AppCtrl.$inject = [];

  function AppCtrl() {
    var vm = this;

    vm.greeting = 'Hello world';
  }
})();
