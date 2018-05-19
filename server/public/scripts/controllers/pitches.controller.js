myApp.controller('PitchController', ['PitchService', function (PitchService) {
  console.log('PitchController created');
  const self = this;
  self.pitchService = PitchService;
  self.pitchData = {}
  self.pitchers = {}
  self.displayStats = false;
  self.pitchSpeed = {};

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
    self.pitchSpeed.roundedSpeed = Math.round(avgSpeed * 100)/100
    self.pitchSpeed.playerID = playerID;
    console.log('object:', self.pitchSpeed);
    
    return self.pitchSpeed;
  }

  self.pitchTypes = function() {
    
  }
  self.addToFaves = function (id) {
    console.log('adding', id, 'to faves for current user');
    PitchService.addToFaves(id).then(function(response) {
      console.log('HOORAY');
      
    })
  }
}]);