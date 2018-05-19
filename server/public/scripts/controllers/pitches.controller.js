myApp.controller('PitchController', ['PitchService', function (PitchService) {
  console.log('PitchController created');
  const vm = this;
  vm.pitchService = PitchService;
  vm.pitchData = {}
  vm.pitchers = {}
  vm.displayStats = false;

  vm.getPitchers = function () {
    console.log('getting list of pitcher IDs');
    PitchService.getPitchers().then(function (response) {
      vm.pitchers.list = PitchService.pitchers.list;
      console.log('vm.list', vm.pitchers.list);
    });
  }

  vm.getPitchDataById = function (id) {
    console.log('getting pitch data from PitcherID', id);
    PitchService.getPitchDataById(id).then(function (response) {
      vm.pitchData.list = PitchService.pitchData.list
      console.log('LIST', vm.pitchData.list);
      vm.avgZoneSpeed();
      vm.displayStats = true;
    })
  }

  vm.avgZoneSpeed = function() {
    let pitchArray = vm.pitchData.list
    console.log('pitch array', pitchArray);

    let sumSpeed = 0;
    console.log('zone speed array', pitchArray);

    for (i = 0; i < pitchArray.length; i++) {
      // console.log('speed is:', pitchArray[i].zonespeed);
      sumSpeed += parseFloat(pitchArray[i].zonespeed);
      // console.log('SUM', sumSpeed);
    }

    let avgSpeed = (sumSpeed/pitchArray.length);
    console.log('AVG', avgSpeed);

    vm.roundedSpeed = Math.round(avgSpeed * 100)/100
    console.log('rounded:', vm.roundedSpeed);
    return vm.roundedSpeed;
  }

  vm.pitchTypes = function() {
    
  }
}]);