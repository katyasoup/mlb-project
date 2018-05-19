myApp.service('PitchService', ['$http', '$location', function ($http, $location) {
  console.log('PitchService Loaded');
  const self = this;
  self.pitchers = {};
  self.pitchData = {};
  self.favorites = {};


  self.getPitchers = function () {
    // console.log('getting all PitcherIDs');
    return $http.get('/api/pitches').then(function (response) {
      // console.log('success! here\'s the response:', response);
      self.pitchers.list = response.data
      // console.log('array:', self.pitchers.list);
    })
  }

  self.getPitchDataById = function (id) {
    console.log('getting pitch data from PitcherID', id);
    return $http.get('/api/pitches/' + id).then(function (response) {
      self.pitchData.list = response.data
      console.log('array:', self.pitchData.list);
    })
  }

  self.getFaves = function () {
    console.log('hit the service route for faves');
    
    return $http.get('/api/favorites').then(function (response) {
      console.log('success! here\'s the response:', response);
      self.favorites.list = response.data
      console.log('array:', self.favorites.list);
    })
  }

  self.addToFaves = function (id) {
    console.log('getting pitch data from PitcherID', id);
    return $http.post('/api/favorites/' + id).then(function (response) {
      console.log('success');
      $location.path('/user');
    },
    function (response) {
      console.log('error');
      self.message = "Something went wrong. Please try again."
    })
  }
}]);