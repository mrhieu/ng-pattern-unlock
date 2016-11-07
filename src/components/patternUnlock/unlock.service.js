(function() {
  'use strict';

  angular.module('patternUnlock')
    .service('PatternUnlockService', PatternUnlockService);

    PatternUnlockService.$inject = [
      '$uibModal'
    ]

    function PatternUnlockService($uibModal) {
      this.unlock = function() {
        var modalInstance = $uibModal.open({
          templateUrl: 'components/patternUnlock/views/unlock.modal.html',
          controller: ModalInstanceCtrl,
          controllerAs: '$ctrl',
          keyboard: false,
          backdrop: 'static',
          size: 'lg',
          windowClass: 'modal-fullscreen',
          resolve: {
            items: function () {
              return []
            }
          }
        });

        function ModalInstanceCtrl() {

        }
      }
    }

})();
