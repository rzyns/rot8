'use strict';

angular.module('rot8')
    .directive('rot8', function () {
        return {
            scope: {
                rot8: '='
            },
            bindToController: true,
            templateUrl: 'components/rot8/rot8.template.html',
            controller: ['$scope', rot8Ctrl],
            controllerAs: 'rot8'
        };

        function rot8Ctrl ($scope) {
            var sheet = window.mysheet = createSheet();

            // Using string interpolation because controllerAs
            $scope.$watch('rot8.length', function () {
              update(sheet, (this.rot8 || []).length);
            });
            update(sheet, (this.rot8 || []).length);

            this.setActiveItem = setActiveItem.bind(this);
            this.setSelectedItem = setSelectedItem.bind(this);
            this.clearActiveItem = clearActiveItem.bind(this);

            function getActiveItem() {
              return this.activeItem;
            }

            function setActiveItem(thing, name) {
              this.activeItem = thing;
              this.activeKey = name;
            }

            function getSelectedItem() {
              return this.selectedItem;
            }

            function setSelectedItem(thing, name) {
              this.selectedItem = thing;
              this.selectedKey = name;
            }

            function clearActiveItem() {
              delete this.activeItem;
              delete this.activeKey;
            }
        }

        // Hooray for Math!
        function calcWidth (n, radius) {
          radius = parseInt(radius, 10);
          if (!radius) {
            radius = 200;
          }

          return radius * Math.sqrt(2 - 2 * Math.cos(2 * Math.PI / n)) || 0;
        };

        function update (sheet, count) {
          var slice = 360/count,
              width = calcWidth(count, 200) + 'px',
              arc, style, i, rule;

          for (i = 1; i <= count; i++) {
            arc = slice * i + 'deg';
            style = 'rotateY(' + arc + ') translateZ(200px)';

            // I'm not sure how this compares performance-wise, but it's way more flexible than
            // using ng-style or hard-coding a crapload of classes and using ng-class...
            sheet.insertRule(rule =
              '.rot8 .item' + i + ' { \n' +
              '  width: ' + width + ';\n' +
              '  transform: ' + style + '; \n' +
              '}'
            , i * 2 - 2);

            sheet.insertRule(rule =
              '.rot8 .item' + i + ':hover { \n' +
              '  transform: ' + style + ' scale(1.08); \n' +
              '}'
            , i * 2 - 1);
          }
        }

        function createSheet () {
          // Create the <style> tag
          var style = document.createElement("style");

          // Add a media (and/or media query) here if you'd like!
          // style.setAttribute("media", "screen")
          // style.setAttribute("media", "only screen and (max-width : 1024px)")

          // WebKit hack :(
          style.appendChild(document.createTextNode(""));

          // Add the <style> element to the page
          document.head.appendChild(style);

          return style.sheet;
        }

        function addCSSRule(sheet, selector, rules, index) {
          if("insertRule" in sheet) {
            sheet.insertRule(selector + "{" + rules + "}", index);
          }
          else if("addRule" in sheet) {
            sheet.addRule(selector, rules, index);
          }
        }
    });
