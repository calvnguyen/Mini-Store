console.log("future routes loading...");

var products = require('../controllers/products.js');
var orders = require('../controllers/orders.js');
var customers = require('../controllers/customers.js');


module.exports = function(app) {
  app.get('/products', products.index);
  app.post('/products', products.create);
  app.delete('/products/:id', products.delete);
 
  app.get('/customers', customers.index);
  app.post('/customers', customers.create);
  app.delete('/customers/:id', customers.delete);
  app.get('/new_customers', customers.index_new);

  app.get('/orders', orders.index);
  app.post('/orders', orders.create);
  app.delete('/orders/:order_id/:prod_id', orders.delete);
  app.get('/orders/:id', orders.show);
  app.get('/new_orders/', orders.recent);
}