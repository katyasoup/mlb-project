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

  self.addToFaves = function (id) {
    console.log('adding', id, 'to faves for current user');
    PitchService.addToFaves().then(function(response) {
      console.log('HOORAY');
      
    })
  }

  self.removeFromFaves = function(id) {
    console.log('removing', id, 'from this user\'s faves');
    PitchService.removeFromFaves(id).then(function(response){
      console.log('DONE DELETED');
      
    })
    
  }
}]);
