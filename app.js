(function () {
'use strict';

angular.module('ControllerAsApp', [])
// .controller('ShoppingListController1', ShoppingListController1)
// .controller('ShoppingListController2', ShoppingListController2)
.controller('ShoppingListController', ShoppingListController)
// .factory('ShoppingListFactory', ShoppingListFactory)
.provider('ShoppingListService', ShoppingListServiceProvider)
.controller('MyController',MyController)
.provider('MyService',MyServiceProvider)
.config(MyConfig)
;

/////// CONFIG ///////
MyConfig.$inject = ['MyServiceProvider'];
function MyConfig(MyServiceProvider){
  MyServiceProvider.defaults.maxItems = 2;
}
// // LIST #1 - controller
// ShoppingListController1.$inject = ['ShoppingListFactory'];
// function ShoppingListController1(ShoppingListFactory) {
//   var list1 = this;
//
//   // Use factory to create new shopping list service
//   var shoppingList = ShoppingListFactory();
//
//   list1.items = shoppingList.getItems();
//
//   list1.itemName = "";
//   list1.itemQuantity = "";
//
//   list1.addItem = function () {
//     shoppingList.addItem(list1.itemName, list1.itemQuantity);
//   }
//
//   list1.removeItem = function (itemIndex) {
//     shoppingList.removeItem(itemIndex);
//   };
// }
//
//
// // LIST #2 - controller
// ShoppingListController2.$inject = ['ShoppingListFactory'];
// function ShoppingListController2(ShoppingListFactory) {
//   var list2 = this;
//
//   // Use factory to create new shopping list service
//   var shoppingList = ShoppingListFactory(3);
//
//   list2.items = shoppingList.getItems();
//
//   list2.itemName = "";
//   list2.itemQuantity = "";
//
//   list2.addItem = function () {
//     try {
//       shoppingList.addItem(list2.itemName, list2.itemQuantity);
//     } catch (error) {
//       list2.errorMessage = error.message;
//     }
//
//   }
//
//   list2.removeItem = function (itemIndex) {
//     shoppingList.removeItem(itemIndex);
//   };
// }

/////// CONTROLLER ////////
ShoppingListController.$inject = ['ShoppingListService'];
function ShoppingListController(ShoppingListService) {
  var list = this;

  list.items = ShoppingListService.getItems();

  list.itemName = "";
  list.itemQuantity = "";

  list.addItem = function () {
    try {
      ShoppingListService.addItem(list.itemName, list.itemQuantity);
    } catch (error) {
      list.errorMessage = error.message;
    }
  };

  list.removeItem = function (itemIndex) {
    ShoppingListService.removeItem(itemIndex);
  };
}

MyController.$inject = ['MyService'];
function MyController(myService){
  var myList = this;
  myList.items = myService.getItems();
  myList.addItem = function(){
    try{
      myService.addItem(myList.itemName, myList.itemQuantity);
    }catch(error){
      myList.errorMessage = error.message;
    }
  myList.removeItem = function(index){
    myService.removeItem(index);
  }

  };

}
///////// SERVICE /////////
// If not specified, maxItems assumed unlimited
function ShoppingListService(maxItems) {
  var service = this;

  // List of shopping items
  var items = [];

  service.addItem = function (itemName, quantity) {
    if ((maxItems === undefined) ||
        (maxItems !== undefined) && (items.length < maxItems)) {
      var item = {
        name: itemName,
        quantity: quantity
      };
      items.push(item);
    }
    else {
      throw new Error("Max items (" + maxItems + ") reached.");
    }
  };

  service.removeItem = function (itemIndex) {
    items.splice(itemIndex, 1);
  };

  service.getItems = function () {
    return items;
  };
}


// function ShoppingListFactory() {
//   var factory = function (maxItems) {
//     return new ShoppingListService(maxItems);
//   };
//
//   return factory;
// }

/////// PROVIDER /////////
function ShoppingListServiceProvider() {
  var provider = this;

  provider.defaults = {
    maxItems: 10
  };

  provider.$get = function () {
    var shoppingList = new ShoppingListService(provider.defaults.maxItems);
    return shoppingList;
  };
}

function MyServiceProvider(){
  var myProvider = this;

  myProvider.defaults = {
    maxItems : 5
  }
  myProvider.$get = function(){
    var shoppingListService =  new ShoppingListService(myProvider.defaults.maxItems);
    return shoppingListService;
  };
  console.log('myProvider',myProvider);
}


})();
