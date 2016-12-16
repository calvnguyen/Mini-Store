console.log('orders controller');
var mongoose = require('mongoose');
var Product = mongoose.model('Product');
var Order = mongoose.model('Order');


function OrdersController(){

	this.index = function(req, res){

		Order.find({}).populate('_customer _product').exec(function(err, orders){
			if (err){
				console.log('error getting orders from db')
			}
			else{
				console.log('successfully retrieved orders from db')
				console.log(orders);
			   
	    		res.json(orders);	
			}
		})
	};

	this.create = function(req, res) {
   		console.log("server - inside orders create controller")
   		console.log(req.body.quantity);
   		// check to make sure user didn't enter invalid qty
   		if (req.body.quantity < 1){
   			res.json({success: 'false'});
   		}

   		console.log(req.body._product);

   		Product.findById({_id: req.body._product}, function(err, product){
   			if(err){
   				console.log('error getting product to add to order');
   			}
   			else{
   				console.log("adding order...");
   				console.log("current product qty: "+ product.quantity);;
		   		console.log("requested qty: " + req.body.quantity);
   				// check product's availability
		   		if (product.quantity >= req.body.quantity){
		   			
		   			// decrement the qty of the product
		   			product.quantity -= req.body.quantity;
		   			product.save(function(err, updatedProduct){
		   				if(err){
		   					console.log("error updating qty with new qty");
		   				}

		   				else{
		   					console.log("updated the qty with new qty");
		   				}
		   			})

		   			Order.create({quantity: req.body.quantity, _product: req.body.
	   				_product, _customer: req.body._customer}, function(err, result){
			      		if(err){
				        	console.log("error creating a new order");
			      		}
			      		else{
			        		res.json(result);
			      		}
	      			})

		   		}
		   		else{
		   			
		   			res.json({success: 'false'});
		   		}
   			}
   		})

   			
   			
  	 	
	};

	this.show = function(req, res){

		Order.findById({_id: req.params.id}, function(err, order){
			if (err){
				console.log('error getting a Order object from db')
			}
			else{
				console.log('successfully retrieved an Order object from db')
			   
	    		res.json(order);	
			}
		})
	}

	this.recent = function(req, res){
		console.log("SERVER - IN RECENT ORDERS");
		Order.find().sort({ createdAt: 'desc'}).limit(3).populate('_product _customer').exec(function(err, orders){
			if(err){
				console.log('error getting most recent orders');
			}
			else{
				console.log(orders);
				res.json(orders);
			}
		})
	}

	this.delete = function(req, res){
		console.log("server - delete order id: "+ req.params.order_id);
		console.log(req.params.order_id);
		console.log(req.params.prod_id);

		// first give back the qty to the product before removing
		Order.findById({_id: req.params.order_id}, function(err, order){
			if (err){
				console.log("error getting order to get current qty");
			}
			else{
				Product.findById({_id: req.params.prod_id}, function(err, product){
					if (err){
						console.log("error getting product to add back qty");
					}
					else{
						product.quantity += order.quantity;

						product.save(function(err, updatedProduct){
			   				if(err){
			   					console.log("error adding qty back to stock");
			   				}

			   				else{
			   					console.log("updated the qty back to stock successfully");
			   				}
		   				})

						Order.remove({_id: req.params.order_id}, function(err){
							if (err){
								console.log('error deleting a Order object from db');
							}
							else{
								console.log('successfully deleted an Order object from db');
			   
	    						res.json({message: 'Order ID ' + req.params.order_id + ' Deleted OK'});
							}
						})

					}
				})
			}
		})


	};
}


module.exports = new OrdersController();