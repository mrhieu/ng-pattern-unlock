(function() {
  'use strict';

  angular.module('patternUnlock')
    .constant('PATTERN_OPTIONS', {
      size: 3 // 3x3
    })

    .directive('pattern', function($timeout) {
      return {
        restrict: 'E',
        templateUrl: 'components/patternUnlock/views/pattern.directive.html',
        bindToController: {
          onDraw: '&'
        },
        link: function(scope, el, attr, vm) {
          angular.element(el).on('mousedown touchstart', function(e) {
            e.preventDefault();

            angular.element(el).on('mousemove touchmove', function(e) {
              e.preventDefault();

              var target = e.type == 'touchmove' ? document.elementFromPoint(e.touches[0].clientX, e.touches[0].clientY) : e.target;

              // Dragging through the pattern-nodes
              if (target.className.indexOf('pattern-node') !== -1) {
                vm.toggleNode(angular.element(target).attr('node-index'), true);
                scope.$apply();
              }
            });
          });

          angular.element(el).on('mouseup touchend', function(e) {
            angular.element(el).off('mousemove touchmove');

            $timeout(function() {
              vm.output();
            }, 500);
          });

          scope.$on('$destroy', function() {
            angular.element(el).off('mousedown touchstart mousemove touchmove mouseup touchend');
          })
        },
        controller: PatternCtrl,
        controllerAs: 'vm',
      }
    })

  function PatternCtrl(PATTERN_OPTIONS) {
    var vm = this;

    vm.patternSize = PATTERN_OPTIONS.size;
    vm.nodes = generateNodes(PATTERN_OPTIONS.size);
    vm.lines = [];
    vm.pattern = [];

    vm.toggleNode = function(index, isActive) {
      // One node can be used only once
      if (!vm.nodes[index].active) {
        vm.pattern.push(index);

        var curLength = vm.pattern.length;
        if (curLength >=2) {
          // draw line between the latest 2 nodes
          vm.drawLine(vm.pattern[curLength - 2], vm.pattern[curLength - 1], PATTERN_OPTIONS.size);
        }
      }

      if (typeof isActive != 'undefined') {
        vm.nodes[index].active = isActive
      } else {
        vm.nodes[index].active = vm.nodes[index].active? false: true;
      }
    }

    vm.drawLine = function(id1, id2, size) {
      vm.lines.push(caculatedLine(id1, id2, size));
    }

    vm.reset = function() {
      vm.nodes = generateNodes(PATTERN_OPTIONS.size);
      vm.lines = [];
      vm.pattern = [];
    }

    vm.output = function() {
      vm.onDraw({pattern: vm.pattern});
      vm.reset();
    }
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
        width: parseInt(100 * calculatedDistance(id1, id2, size) + 10) + 'px'
      },
      direction: calculatedDirection(id1, id2, size)
    }
  }

  function calculatedDirection(id1, id2, size) {
    var p1 = coordinate(id1, size);
    var p2 = coordinate(id2, size);

    // Almost forgot about Maths :< http://www.brainsofsteel.co.uk/post/How-to-Calculate-the-Direction-between-two-Points
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

  function calculatedDistance(id1, id2, size) {
    var p1 = coordinate(id1, size);
    var p2 = coordinate(id2, size);

    return Math.sqrt((p1.x - p2.x) * (p1.x-p2.x) + (p1.y - p2.y) * (p1.y - p2.y));
  }

  function coordinate(id, size) {
    return {
      x: id % size + 1,
      y: parseInt(id / size) + 1
    }
  }

})();
