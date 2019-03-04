// ROUTES
myApp.config(function ($routeProvider) {
   
    $routeProvider
    
    .when('/', {
        templateUrl: 'assets/pages/home.htm',
        controller: 'homeController'
    })
    
    // we can add more routes here
    .when('/about', {
        templateUrl: 'pages/about_swytch.htm',
        controller: 'aboutController'
    });
    
});