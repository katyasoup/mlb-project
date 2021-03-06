myApp.controller('LoginController', ['$http', '$location', 'UserService', function($http, $location, UserService) {
    console.log('LoginController created');
   
    const self = this;
    self.user = {
      username: '',
      password: ''
    };
    self.message = '';

    self.login = function () {
      if (self.user.username === '' || self.user.password === '') {
        self.message = "Please enter your username and password";
      } else {
        $http.post('/api/user/login', self.user).then(
          function (response) {
            if (response.status == 200) {
              $location.path('/user');
            } else {
              self.message = "Incorrect credentials. Please try again.";
            }
          },
          function (response) {
            console.log('failure error: ', response);
            self.message = "Incorrect credentials. Please try again.";
          });
      }
    };

    self.registerUser = function () {
      if (self.user.username === '' || self.user.password === '') {
        self.message = "Please choose a username and password!";
      } else {
        console.log('sending to server...', self.user);
        $http.post('/api/user/register', self.user).then(function (response) {
          console.log('success');
          $location.path('/home');
        },
          function (response) {
            console.log('error');
            self.message = "Something went wrong. Please try again."
          });
      }
    }
}]);
