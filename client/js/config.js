 //  inject the ngRoute dependency in the module.

var myApp = angular.module('myApp', ['ngRoute', 'ngMessages', 'angularMoment', 'yaru22.angular-timeago']);
    //  use the config method to set up routing:
    myApp.config(function ($routeProvider) {
    $routeProvider
    .when('/',{
        templateUrl: 'partials/dashboard.html',
        controller: 'DashController'
    })
    .when('/orders',{
        templateUrl: 'partials/orders.html',
        controller: 'OrdersController'
    })
    .when('/customers',{
        templateUrl: 'partials/customers.html',
        controller: 'CustomersController'
    })
    .when('/products',{
        templateUrl: 'partials/products.html',
        controller: 'ProductsController'
    })
    .otherwise({
      redirectTo: '/'
    });
}); 