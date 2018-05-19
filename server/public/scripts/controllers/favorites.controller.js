myApp.controller('FavoritesController', ['PitchService', function(PitchService) {
  console.log('Favorites Controller created');
  const self = this;
  self.favorites = {};

  self.getFaves = function() {
    console.log('getting favorites data');
    PitchService.getFaves().then(function (response) {
      self.favorites.list = PitchService.favorites.list;
      console.log('user favorites:', self.favorites.list);
    })
  }
}]);
