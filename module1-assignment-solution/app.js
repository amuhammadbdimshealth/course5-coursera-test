(function() {
  'use strict';

angular.module("LunchCheck", [])
.controller("LunchCheckController", LunchCheckController)

LunchCheckController.$inject = ['$scope'];
function LunchCheckController($scope){
  $scope.itemList = "";
  $scope.message = "";

  $scope.checkIfTooMuch = function(){
    var items = $scope.itemList.split(",");
    var itemsNum = items.length;
    console.log(items);
    $scope.message = generateMessage(items,itemsNum);

  };

  function generateMessage(items,itemsNum){
    if (itemsNum==1 && items[0]=="") {
      return "Please enter data first!"
    }
    else if (itemsNum<=3) {
      return "Enjoy!"
    }
    else {
      return "Too Much!"
    }
  }
}

}());
