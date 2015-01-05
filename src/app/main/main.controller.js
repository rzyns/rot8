'use strict';

angular.module('rot8')
  .controller('MainCtrl', ['AwesomeThingsService', '$log', function (AwesomeThingsService, $log) {
        this.data = AwesomeThingsService;
    }]);