myApp.controller('PitchController', ['PitchService', function (PitchService) {
    console.log('PitchController created');
    var vm = this;
    vm.pitchService = PitchService;
    vm.pitchData = PitchService.pitchData;
    vm.pitchers = {}
  
    vm.getPitchers = function () {
      console.log('getting list of pitcher IDs');
      PitchService.getPitchers().then(function(response) {
        vm.pitchers.list = PitchService.pitchers.list;
        console.log('vm.list', vm.pitchers.list);
      });
      
      
    }
  
    vm.getPitchDataById = function (id) {
        console.log('getting pitch data from PitcherID', id);
        PitchService.getPitchDataById(id)
    }
  
  }]);