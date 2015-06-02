angular.module('app',['ngResource']);

angular.module('app').controller('csvrawCtrl', function ($scope, $resource) {
    $scope.csvrawdata= $resource('/api/csvraw').query();
});