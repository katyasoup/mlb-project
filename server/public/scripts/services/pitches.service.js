myApp.service('PitchService', ['$http', '$location', function ($http, $location) {
  console.log('PitchService Loaded');
  const self = this;

  // holds array of pitchers
  self.pitchers = {};

  // holds complete data for one pitcher
  self.pitchData = {};

  // holds array of favorites for one user
  self.favorites = {};

  // holds notes data for one pitcher on favorite list
  self.pitcher = {};


  self.getPitchers = function () {
    return $http.get('/api/pitches').then(function (response) {
      self.pitchers.list = response.data
    })
  }

  self.getPitchDataById = function (id) {
    return $http.get('/api/pitches/' + id).then(function (response) {
      self.pitchData.list = response.data
    })
  }

  self.pitchTypes = function(id) {
    return $http.get('/api/pitches/' + id + '/types').then(response => {
      self.pitchData.types = response.data;
    })
  }

  self.getFaves = function () {
    return $http.get('/api/favorites').then(function (response) {
      self.favorites.list = response.data
    })
  }

  self.addToFaves = function (id) {
    return $http.post('/api/favorites/' + id).then(function (response) {
        $location.path('/user');
      },
      function (response) {
        self.message = "Something went wrong. Please try again."
      })
  }

  self.removeFromFaves = function (id) {
    return $http.delete('/api/favorites/delete/' + id).then(function (response) {
        $location.path('/user');
      },
      function (response) {
        self.message = "Something went wrong. Please try again."
      })
  }
  
  self.getPitcherNotes = function (id) {
    return $http.get('/api/favorites/' + id).then(function (response) {
      self.pitcher.notes = response.data
    })
  }


}]);