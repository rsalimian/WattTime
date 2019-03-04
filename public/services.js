// SERVICES

myApp.service('griddataService', ['$resource', function($resource) {

    this.getData = function(page, limit) {
        var wattAPI = $resource("/api/griddata?limit=" + limit + "&page=" + page);
        var data = wattAPI.query();
       return data;
    };

}]);