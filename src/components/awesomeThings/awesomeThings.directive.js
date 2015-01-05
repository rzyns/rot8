'use strict';

angular.module('rot8')
    .directive('awesomeThings', function () {
        return {
            templateUrl: 'components/awesomeThings/awesomeThings.template.html',
            controller: ['AwesomeThingsService', function (AwesomeThingsService) {
                this.awesomeThings = angular.copy(AwesomeThingsService);
                this.reorganize = function reorganize() {
                    angular.forEach(this.awesomeThings, function (awesomeThing) {
                        awesomeThing.rank = Math.random();
                    });
                };
            }],
            controllerAs: 'things'
        };
    });