(function() {
  'use strict';

  angular.module('patternUnlock')
    .constant('PATTERN_OPTIONS', {
      size: 3 // 3x3
    })

    .directive('pattern', function() {
      return {
        restrict: 'E',
        templateUrl: 'components/patternUnlock/views/pattern.directive.html',
        link: function() {

        },
        controller: PatternCtrl,
        controllerAs: '$ctrl',
      }
    })

  function PatternCtrl(PATTERN_OPTIONS) {
    var $ctrl = this;

    $ctrl.patternSize = PATTERN_OPTIONS.size;
    $ctrl.nodes = generateNodes(PATTERN_OPTIONS.size);
    $ctrl.lines = [
      {
        style: {left: '145px', top: '145px'},
        direction: 'x ne'
      }
    ];

    $ctrl.toggleNode = function(index, isActive) {
      if (typeof isActive != 'undefined') {
        $ctrl.nodes[index].active = isActive
      } else {
        $ctrl.nodes[index].active = $ctrl.nodes[index].active? false: true;
      }
    }

    $ctrl.drawLine = function(id1, id2) {

    }
  }

  function generateNodes(size) {
    var nodes = [];
    for (var i = 1; i <= size * size; i++) {
      nodes.push({
        active: false
      })
    }

    return nodes;
  }

})();
