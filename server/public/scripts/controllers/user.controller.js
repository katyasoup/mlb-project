myApp.controller('UserController', ['UserService', function(UserService) {
  console.log('UserController created');
  const self = this;
  self.userService = UserService;
  self.userObject = UserService.userObject;
}]);
