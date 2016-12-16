

myApp.controller('DashController', ['$scope', 'productsFactory', 'ordersFactory', 'customersFactory', '$location', function($scope, productsFactory, ordersFactory, customersFactory, $location) {
/* Private Methods */
  $scope.products = [];
  $scope.orders = [];
  $scope.customers = [];
  $scope.recent_customers = [];
  $scope.recent_orders = [];

  var productsIndex = function() {
      productsFactory.index(function (data) {
        $scope.products = data;
        console.log("products controller data:");
        console.log(data);
    }); 
  }

  var recentOrders = function() {
    ordersFactory.recentOrd(function (data){
      $scope.recent_orders = data;
      console.log("recent orders..");
      console.log(data);
    })
  }

  var recentCustomers = function() {
    customersFactory.recentCust(function (data){
      $scope.recent_customers = data;
      console.log("recent customers..")
      console.log(data);
    })
  }

  productsIndex();
  recentOrders();
  recentCustomers();

}]);


myApp.controller('CustomersController', ['$scope', 'customersFactory', '$location', function($scope, customersFactory, $location){

  $scope.customers = [];
  $scope.customer = {};
  $scope.error = "";
  $scope.sortType = 'name';
  $scope.sortReverse = false;


  var customersIndex = function(){
    customersFactory.index(function(returnedData){
      $scope.customers = returnedData;
      console.log($scope.customers);
    });
  };
  
  customersIndex();

  $scope.addCustomer = function(){
    console.log($scope.newCust);
    customersFactory.create($scope.newCust, function(data){
      console.log("back from factory in adding customer..")
      console.log(data);
      if(data.error){
        $scope.error = data.error;
        console.log($scope.error);
      }
      else{
        $scope.error = "";
      }
      $scope.customer = data;
      $scope.newCust = {};
      console.log("add - back from factory")
      customersIndex();
    })

  }

  $scope.deleteCustomer = function(cust_id){
    console.log("Customer Controller: I'm deleting customer...");
    console.log(cust_id);
    customersFactory.delete(cust_id, function (data){
      if (data.errors) {
        //display errors
      } else {
        customersIndex();
      }
    })
  }


}]);

myApp.controller('OrdersController', ['$scope', 'ordersFactory', 'customersFactory', 'productsFactory', '$location', function($scope, ordersFactory, customersFactory, productsFactory, $location) {
/* Private Methods */
  $scope.orders = [];
  $scope.order = {};
  $scope.customers = [];
  $scope.products = [];
  $scope.sortType = 'name';
  $scope.sortReverse = false;



  var customersIndex = function(){
    customersFactory.index(function(returnedData){
      $scope.customers = returnedData;
      console.log($scope.customers);
    });
  };

  var productsIndex = function() {
      productsFactory.index(function (data) {
      $scope.products = data;
      console.log("products controller data:");
      console.log(data);
    }); 
  }
  
  customersIndex();
  productsIndex();


  var ordersIndex = function(){
    ordersFactory.index(function(returnedData){
      $scope.orders = returnedData;
      console.log($scope.orders);
    });
  };
  
  ordersIndex();

  $scope.addOrder = function(){
    ordersFactory.create($scope.newOrder, function(data){
      console.log("back from factory in adding order..")
      console.log(data);
      $scope.order = data;
      $scope.newOrder = {};
      ordersIndex();
    })

  }

  $scope.deleteOrder = function(order_id, prod_id){
    console.log("Products Controller: I'm deleting order...");
    console.log(order_id);
    console.log(prod_id);
    ordersFactory.delete(order_id, prod_id, function (data){
      if (data.errors) {
        //display errors
      } else {
        ordersIndex();
      }
    })
  }

  
}]);

myApp.controller('ProductsController', ['$scope', 'productsFactory', function($scope, productsFactory) {

  $scope.products = [];
  $scope.product = {};

  var productsIndex = function() {
      productsFactory.index(function (data) {
      $scope.products = data;
      console.log("products controller data:");
      console.log(data);
    }); 
  }

  $scope.addProduct = function(){
    console.log($scope.newProduct);
    productsFactory.create($scope.newProduct, function(data){
      console.log("back from factory in adding product..")
      $scope.product = data;
      $scope.newProduct = {};
      productsIndex();

    })

  }


  $scope.deleteProduct = function(prod_id){
    console.log("Products Controller: I'm deleting product...");
    console.log(prod_id);
    productsFactory.delete(prod_id, function (data){
      if (data.errors) {
        //display errors
      } else {
        productsIndex();
      }
    })
  }

  productsIndex();

  
}]);

