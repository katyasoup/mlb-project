myApp.service('UserService', ['$http', '$location', function($http, $location){
  console.log('UserService Loaded');
  const self = this;
  self.userObject = {};

  self.getuser = function(){
    $http.get('/api/user').then(function(response) {
        if(response.data.username) {
            // user has a curret session on the server
            self.userObject.userName = response.data.username;
        } else {
            // user has no session, bounce them back to the login page
            $location.path("/home");
        }
    },function(response){
      console.log('UserService -- getuser -- failure: ', response);
      $location.path("/home");
    });
  },

  self.logout = function() {
    $http.get('/api/user/logout').then(function(response) {
      $location.path("/home");
    });
  }
}]);
