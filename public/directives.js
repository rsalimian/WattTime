// DIRECTIVES
myApp.directive("watt", function() {
    return {
        restrict: 'E',
        templateUrl: 'assets/directives/watt.html',
        replace: true,
        scope: {
            wattObject: "="
        }
    }
 });