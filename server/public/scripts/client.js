var myApp = angular.module('myApp', ['ngRoute']);

  myApp.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    console.log('myApp -- config')
    $routeProvider
      .when('/', {
        redirectTo: 'home'
      })
      .when('/home', {
        templateUrl: '/templates/home.html',
        controller: 'PitchController as pc',
      })
    // .when('/info', {
    //   templateUrl: '../templates/about.html',
    //   controller: 'InfoController as ic',
    //   // resolve: {
    //   //   getuser : function(UserService){
    //   //     return UserService.getuser();
    //   //   }
    //   // }
    // })
    .otherwise({
      template: '<h1>404</h1>'
    });
}]);
