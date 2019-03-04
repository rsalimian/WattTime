// CONTROLLERS

myApp.controller('homeController', ['$scope', '$location', 'griddataService','$routeParams', function($scope, $location, $griddataService, $routeParams) {

    // get pagination params from url, page number and page size
    $page = Number.parseInt($location.search()['p']) || 0;
    $scope.pageNumber = $page + 1;
    $scope.pageLimit = $location.search()['s'] || 10;

    $scope.prevPage = $page === 0 ? 0 : ($page - 1);
    $scope.nextPage = $page + 1;

    // call back end API to pull data form MongoDB
    $scope.griddatas = $griddataService.getData($scope.pageNumber, $scope.pageLimit);

}]);