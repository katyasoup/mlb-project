myApp.controller('PitchController', ['PitchService','$http', '$location', function (PitchService, $http, $location) {
  console.log('PitchController created');
  const self = this;
  self.pitchService = PitchService;
  self.pitchData = {}
  self.pitchers = {}
  self.displayStats = false;
  self.pitcher = {};
  self.favorites = {};
  self.editNotes = false;

  self.getPitchers = function () {
    PitchService.getPitchers().then(response => {
      self.pitchers.list = PitchService.pitchers.list;
    });
  }

  self.getPitchDataById = function (id) {
    PitchService.getPitchDataById(id).then(response => {
      self.pitchData.list = PitchService.pitchData.list
      self.avgZoneSpeed();
      self.displayStats = true;
    })
  }

  self.getPitcherNotes = function (id) {
    PitchService.getPitcherNotes(id).then(response => {
      self.pitcher.notes = PitchService.pitcher.notes;
    })
  }

  self.avgZoneSpeed = function () {
    let pitchArray = self.pitchData.list
    let sumSpeed = 0;

    for (i = 0; i < pitchArray.length; i++) {
      sumSpeed += parseFloat(pitchArray[i].zonespeed);
      playerID = parseInt(pitchArray[i].pitcherid)
    }

    let avgSpeed = (sumSpeed / pitchArray.length);
    self.pitcher.roundedSpeed = Math.round(avgSpeed * 100) / 100
    self.pitcher.playerID = playerID;
    console.log('object:', self.pitcher);
    return self.pitcher;
  }

  self.pitchTypes = function () {

  }

  self.getFaves = function () {
    console.log('getting favorites data');
    PitchService.getFaves().then(response => {
      self.favorites.list = PitchService.favorites.list;
      console.log('user favorites CAAAAAAAKE:', self.favorites.list);
    })
  }

  self.updateNotes = function (id) {
    self.task = {
      pitcherid: id,
      notes: self.task.notes
    };
    return $http({
      method: 'PUT',
      url: '/api/favorites/' + id,
      data: self.task
    }).then(function (response) {
      console.log('success');
      self.getPitchDataById(id); 
      self.getPitcherNotes(id)
    })
  },
  function (response) {
    console.log('error');
    self.message = "Something went wrong. Please try again."
  }
  

  self.addToFaves = function (id) {
    console.log('adding', id, 'to faves for current user');
    PitchService.addToFaves(id).then(response => {
      console.log('HOORAY');

    })
  }

  self.removeFromFaves = function (id) {
    console.log('removing', id, 'from this user\'s faves');
    PitchService.removeFromFaves(id).then(response => {
      console.log('DONE DELETED');
      location.reload();
    })

  }

  self.toggleEdit = function() {
    self.editNotes = !self.editNotes
  }
}]);