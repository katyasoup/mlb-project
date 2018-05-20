myApp.controller('PitchController', ['PitchService', '$http', '$location', function (PitchService, $http, $location) {
  console.log('PitchController created');
  const self = this;
  self.pitchService = PitchService;

  // objects to hold data from server
  self.pitchData = {}
  self.pitchers = {}
  self.pitcher = {};
  self.favorites = {};

  // show/hide toggles
  self.displayStats = false;
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
      self.pitchTypes(id);
      self.displayStats = true;
    })
  }

  self.avgZoneSpeed = function () {
    let pitchArray = self.pitchData.list;
    let sumSpeed = 0;

    for (i = 0; i < pitchArray.length; i++) {
      sumSpeed += parseFloat(pitchArray[i].zonespeed);
      playerID = parseInt(pitchArray[i].pitcherid)
    }

    let avgSpeed = (sumSpeed / pitchArray.length);
    self.pitcher.roundedSpeed = Math.round(avgSpeed * 100) / 100
    self.pitcher.playerID = playerID;
    return self.pitcher;
  }

  self.pitchTypes = function (id) {
    PitchService.pitchTypes(id).then(response => {
      self.pitcher.types = PitchService.pitchData.types;

      let typesArray = self.pitcher.types;
      let count = 0;
      let sum = 0;

      // set pitchcount value to integer and sum all pitchcounts
      for (i = 0; i < typesArray.length; i++) {
        count = parseInt(typesArray[i].pitchcount)
        typesArray[i].pitchcount = count
        sum += count
      }

      // convert to percentage value
      for (j = 0; j < typesArray.length; j++) {
        typesArray[j].pitchcount /= sum
      }
    })
  }

  self.getFaves = function () {
    PitchService.getFaves().then(response => {
      self.favorites.list = PitchService.favorites.list;
    })
  }

  self.addToFaves = function (id) {
    PitchService.addToFaves(id)
  }

  self.removeFromFaves = function (id) {
    PitchService.removeFromFaves(id).then(response => {
      location.reload();
    })
  }
  
  self.getPitcherNotes = function (id) {
    PitchService.getPitcherNotes(id).then(response => {
      self.pitcher.notes = PitchService.pitcher.notes;
    })
  }

  self.toggleEdit = function () {
    self.editNotes = !self.editNotes
  }

  self.updateNotes = function (id) {
    self.noteObj = {
      pitcherid: id,
      notes: self.notes.note
    };
    return $http({
      method: 'PUT',
      url: '/api/favorites/' + id,
      data: self.noteObj
    }).then(response => {
      self.getPitchDataById(id);
      self.getPitcherNotes(id)
    })
  }

}]);