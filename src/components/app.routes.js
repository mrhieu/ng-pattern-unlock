(function() {
  'use strict';

  angular.module('app')
    .config(function($stateProvider, $urlRouterProvider) {
      $urlRouterProvider
        .otherwise('/app/index');

      $stateProvider
        .state('app', {
          abstract: true,
          url: '/app',
          templateUrl: 'components/common/views/app.index.html',
          controller: 'AppCtrl',
          controllerAs: 'app'
        })

        .state('app.index', {
          url: '/index',
          templateUrl: 'components/common/views/app.lock.html'
        })

        .state('app.unlock', {
          url: '/unlock',
          templateUrl: 'components/common/views/app.unlock.html'
        })
    })

})();
