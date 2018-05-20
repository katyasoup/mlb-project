myApp.controller('PitchController', ['PitchService', function (PitchService) {
  console.log('PitchController created');
  const self = this;
  self.pitchService = PitchService;
  self.pitchData = {}
  self.pitchers = {}
  self.displayStats = false;
  self.pitcher = {};
  self.favorites = {};

  self.getPitchers = function () {
    PitchService.getPitchers().then(function (response) {
      self.pitchers.list = PitchService.pitchers.list;
    });
  }

  self.getPitchDataById = function (id) {
    PitchService.getPitchDataById(id).then(function (response) {
      self.pitchData.list = PitchService.pitchData.list
      self.avgZoneSpeed();
      self.displayStats = true;
    })
  }

  self.avgZoneSpeed = function() {
    let pitchArray = self.pitchData.list
    let sumSpeed = 0;

    for (i = 0; i < pitchArray.length; i++) {
      sumSpeed += parseFloat(pitchArray[i].zonespeed);
      playerID = parseInt(pitchArray[i].pitcherid)
    }

    let avgSpeed = (sumSpeed/pitchArray.length);
    self.pitcher.roundedSpeed = Math.round(avgSpeed * 100)/100
    self.pitcher.playerID = playerID;
    console.log('object:', self.pitcher);
    
    return self.pitcher;
  }

  self.pitchTypes = function() {
    
  }
  self.getFaves = function() {
    console.log('getting favorites data');
    PitchService.getFaves().then(function (response) {
      self.favorites.list = PitchService.favorites.list;
      console.log('user favorites:', self.favorites.list);
    })
  }

  self.addToFaves = function (id) {
    console.log('adding', id, 'to faves for current user');
    PitchService.addToFaves(id).then(function(response) {
      console.log('HOORAY');
      
    })
  }

  self.removeFromFaves = function(id) {
    console.log('removing', id, 'from this user\'s faves');
    PitchService.removeFromFaves(id).then(function(response){
      console.log('DONE DELETED');
      location.reload();
    })
    
  }
  
}]);