(function() {
  'use strict';
angular.module('ShoppingListCheckOff',[])
.controller('ToBuyController',ToBuyController)
.controller('AlreadyBoughtController',AlreadyBoughtController)
.service('ShoppingListCheckOffService',ShoppingListCheckOffService);

ToBuyController.$inject = ['ShoppingListCheckOffService'];
function ToBuyController(ShoppingListCheckOffService){
  var toBuyList = this;
  toBuyList.buy = function(index){
    ShoppingListCheckOffService.buy(index);
  };
  toBuyList.toBuyItems = ShoppingListCheckOffService.getToBuyItems();
}

AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
function AlreadyBoughtController(ShoppingListCheckOffService){
  var boughtList = this;
  boughtList.boughtItems = ShoppingListCheckOffService.getBoughtItems();
}

function ShoppingListCheckOffService(){
  var shopService = this;
  var toBuyItems = [
    { name : "Virgin Coconut Oil", quantity : 1 },
    { name : "Talbina", quantity : 2 },
    { name : "Mobile Cover", quantity : 3 },
    { name : "Papaya", quantity : 4 },
    { name : "Books", quantity : 10 },
    { name : "Shampoo", quantity : 1 }
  ];
  var boughtItems = [];
  shopService.buy = function(index){
    var boughtItem = toBuyItems.splice(index,1)[0]; //remove from to buy item list
    console.log(boughtItem);
    boughtItems.push(boughtItem); //add to bought item list
    console.log(boughtItems);

  };
  shopService.getToBuyItems = function(){
    return toBuyItems;
  };
  shopService.getBoughtItems = function(){
    return boughtItems;
  };
}

// ToBuyController
// AlreadyBoughtController
}());
