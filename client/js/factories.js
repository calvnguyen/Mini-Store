// Customers Factory
myApp.factory('customersFactory', ['$http', function($http) {
	var customers = [];
  var recent_customers = [];
	var customer = {};

	function CustomersFactory(){
		var _this = this;
		this.create = function(newcust, callback){
			$http.post('/customers', newcust).then(function(returned_data){
        console.log("back to factory..");
				console.log(returned_data.data);
				if (typeof(callback) == 'function'){
					callback(returned_data.data);
				}

			});
		};
		
		
    this.index = function(callback){
  		//call this method if you want to update or set the friends variable
    	$http.get('/customers').then(function(returned_data){
        console.log(returned_data);
        customers = returned_data.data;
        callback(customers);
      });

    };
    this.delete = function(cust_id, callback){
        $http.delete('/customers/'+cust_id).then(function(returned_data){
        console.log(returned_data.data);
        if (typeof(callback) == 'function'){
          callback(returned_data.data);
        }

      });
    };


    this.recentCust = function(callback){
      //call this method if you want to update or set the friends variable
      $http.get('/new_customers').then(function(returned_data){
        console.log(returned_data);
        recent_customers = returned_data.data;
        callback(recent_customers);
      });

    };
    
    	// Sometimes you might not want to make a DB call, and just get the information stored in the factory.
    // this.getFriends = function(callback){
    //   callback(friends);
    // };
    // this.getFriend = function(callback){
    //   callback(friend);
    // };
  }

  return new CustomersFactory();

}]);

// Products Factory
myApp.factory('productsFactory', ['$http', function($http) {
  var products = [];
  var product = {};

  function ProductsFactory(){
    var _this = this;
    this.create = function(newproduct, callback){
      $http.post('/products', newproduct).then(function(returned_data){
        console.log("factory - back from create product");
        console.log(returned_data.data);
        if (typeof(callback) == 'function'){
          callback(product);
        }

      });
    };
    
    
    this.index = function(callback){
      //call this method if you want to update or set the friends variable
      $http.get('/products').then(function(returned_data){
        console.log(returned_data);
        products = returned_data.data;
        callback(products);
      });

     };

    this.delete = function(prod_id, callback){
        console.log('/products/'+prod_id);
        $http.delete('/products/'+prod_id).then(function(returned_data){
        console.log(returned_data.data);
        if (typeof(callback) == 'function'){
          callback(returned_data.data);
        }

      });
    };
   
  }

  return new ProductsFactory();

}]);

// Orders Factory
myApp.factory('ordersFactory', ['$http', function($http) {
  var orders = [];
  var order = {};
  var recent_orders = [];

  function OrdersFactory(){
    var _this = this;
    this.create = function(neworder, callback){
      console.log("inside orders factory");
      console.log(neworder);
      $http.post('/orders/', neworder).then(function(returned_data){
        console.log("orders controller - back from server")
        console.log(returned_data.data);
        if (typeof(callback) == 'function'){
          console.log("type function is good");
          callback(returned_data.data);
        }

      });
    };
    
    
    this.index = function(callback){
      //call this method if you want to update or set the friends variable
      $http.get('/orders').then(function(returned_data){
        console.log(returned_data);
        orders = returned_data.data;
        callback(orders);
    });
   //Note: this can be shortened to $http.get('/friends').then(callback); 
   //But only if you only want to run the callback from the controller.
    };
    this.delete = function(order_id, prod_id, callback){
        console.log("in orders factory - delete")
        $http.delete('/orders/'+order_id + "/" + prod_id).then(function(returned_data){
        console.log(returned_data.data);
        if (typeof(callback) == 'function'){
          callback(returned_data.data);
        }

      });
    };
    this.show = function(order_id, callback){
        $http.get('/orders/'+order_id).then(function(returned_data){
          console.log(returned_data.data);
          if (typeof(callback) == 'function'){
            callback(returned_data.data);
          }

        });
    };

    this.recentOrd = function(callback){
      console.log("recent order factory");
      $http.get('/new_orders').then(function(returned_data){
        console.log("Factory - back from Recent orders")
        console.log(returned_data);
        recent_orders = returned_data.data;
        callback(recent_orders);
      });

    };

      // Sometimes you might not want to make a DB call, and just get the information stored in the factory.
    this.getOrders = function(callback){
      callback(orders);
    };
    this.getOrder = function(callback){
      callback(order);
    };
  }

  return new OrdersFactory();

}]);