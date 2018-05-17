myApp.service('PitchService', ['$http', '$location', function ($http, $location) {
  console.log('PitchService Loaded');
  var self = this;
  self.pitchers = {}
  self.pitchData = {}


  self.getPitchers = function () {
    // console.log('getting all PitcherIDs');
    return $http.get('/pitchers').then(function (response) {
      // console.log('success! here\'s the response:', response);
      self.pitchers.list = response.data
      // console.log('array:', self.pitchers.list);
    })
  }




  self.getPitchDataById = function (id) {
    console.log('getting pitch data from PitcherID', id);
    return $http.get('/pitchers/' + id).then(function (response) {
      self.pitchData.list = response.data
      console.log('array:', self.pitchData.list);
    })
  }
}]);