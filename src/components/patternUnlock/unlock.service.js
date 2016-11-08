(function() {
  'use strict';

  angular.module('patternUnlock')
    .service('PatternUnlockService', PatternUnlockService);

    PatternUnlockService.$inject = [
      '$uibModal'
    ]

    function PatternUnlockService($uibModal, $localStorage) {
      this.isRegistered = function() {
        return !!$localStorage.pattern;
      }

      this.reset = function() {
        return $uibModal.open({
          templateUrl: 'components/patternUnlock/views/reset.modal.html',
          controller: function($scope, $localStorage, $uibModalInstance) {
            $scope.validate = function(pattern) {
              $localStorage.pattern = pattern;
              $uibModalInstance.close();
            }
          },
          keyboard: false,
          backdrop: 'static',
          size: 'lg',
          windowClass: 'modal-fullscreen'
        }).result;
      }

      this.unlock = function() {
        return $uibModal.open({
          templateUrl: 'components/patternUnlock/views/unlock.modal.html',
          controller: function($scope, $localStorage, $uibModalInstance) {
            $scope.isIncorrect = false;

            $scope.validate = function(pattern) {
              if (angular.equals(pattern, $localStorage.pattern)) {
                $uibModalInstance.close()
              } else {
                $scope.isIncorrect = true;
              }
            }
          },
          keyboard: false,
          backdrop: 'static',
          size: 'lg',
          windowClass: 'modal-fullscreen'
        }).result;
      }
    }

})();
