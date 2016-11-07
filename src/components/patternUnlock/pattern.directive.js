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
    $ctrl.lines = [];

    $ctrl.toggleNode = function(index, isActive) {
      if (typeof isActive != 'undefined') {
        $ctrl.nodes[index].active = isActive
      } else {
        $ctrl.nodes[index].active = $ctrl.nodes[index].active? false: true;
      }
    }

    $ctrl.drawLine = function(id1, id2) {
      $ctrl.lines.push(caculatedLine(id1, id2, PATTERN_OPTIONS.size));
    }

    $ctrl.drawLine(5, 6);
  }

  function generateNodes(size) {
    var nodes = [];
    for (var i = 0; i < size * size; i++) {
      nodes.push({
        active: false
      })
    }

    return nodes;
  }

  function caculatedLine(id1, id2, size) {
    return {
      style: {
        left: (100 * (id1 % size) + 45) + 'px',
        top: (100 * (parseInt(id1 / size)) + 45) + 'px',// left: 45px and top: 45px is the position of .pattern-line for node (1,1)
      },
      direction: calculatedDirection(id1, id2, size)
    }
  }

  function calculatedDirection(id1, id2, size) {
    var p1 = coordinate(id1, size);
    var p2 = coordinate(id2, size);

    // Almost forgot about Math :< http://www.brainsofsteel.co.uk/post/How-to-Calculate-the-Direction-between-two-Points
    var diffx = p1.x - p2.x;
    var diffy = p1.y - p2.y;
    var angle = Math.atan2(diffx, diffy) * 180 /Math.PI;

    var direction = 'n';
    if (angle == 0) {
      direction = 'n'
    } else if (angle < 0 && angle > -45) {
      direction = 'nne'
    } else if (angle == -45) {
      direction = 'ne'
    } else if (angle < -45 && angle > -90) {
      direction = 'een'
    } else if (angle == -90) {
      direction = 'e'
    } else if (angle < -90 && angle > -135) {
      direction = 'ees'
    } else if (angle == -135) {
      direction = 'es'
    } else if (angle < -135 && angle > -179) {
      direction = 'sse'
    } else if (angle == 180) {
      direction = 's'
    } else if (angle < 180 && angle > 135) {
      direction = 'ssw'
    } else if (angle == 135) {
      direction = 'sw'
    } else if (angle < 135 && angle > 90) {
      direction = 'wws'
    } else if (angle == 90) {
      direction = 'w'
    } else if (angle < 90 && angle > 45) {
      direction = 'wwn'
    } else if (angle == 45) {
      direction = 'wn'
    } else if (angle < 45 && angle > 0) {
      direction = 'nnw'
    }

    return direction;
  }

  function coordinate(id, size) {
    return {
      x: id % size + 1,
      y: parseInt(id / size) + 1
    }
  }

})();
