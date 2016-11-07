(function() {
  'use strict';

  angular.module('patternUnlock')
    .constant('PATTERN_OPTIONS', {
      size: 3 // 3x3
    })

    .directive('pattern', pattern);

  function pattern() {
    return {
      restrict: 'E',
      templateUrl: 'components/patternUnlock/views/pattern.directive.html',
      link: function() {

      },
      controller: PatternCtrl,
      controllerAs: '$ctrl',
    }
  }

  function PatternCtrl(PATTERN_OPTIONS) {
    var $ctrl = this;

    $ctrl.patternSize = PATTERN_OPTIONS.size;
    console.log($ctrl.patternSize);
    $ctrl.nodes = [1,2,3,4,5,6,7,8,9];
  }

})();
