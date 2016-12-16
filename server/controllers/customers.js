console.log('customers controller');
var mongoose = require('mongoose');
var Customer = mongoose.model('Customer');
var Order = mongoose.model('Order');


function CustomersController(){

	this.index = function(req, res){

		Customer.find({}, function(err, customers){
			if (err){
				console.log('error getting customers from db')
			}
			else{
				console.log('successfully retrieved customers from db')
				console.log(customers);
			   
	    		res.json(customers);	
			}
		})
	};

	this.create = function(req, res) {
   		console.log("server - inside customers create controller")

   	
   		Customer.findOne({name: req.body.name}).count(function(err, count){
   			if(err){
   				console.log("error getting customer to check");
   			}

   			else{
   				console.log("getting customer to check ok");
 
   				console.log(count);

   				if (count == 0){
   					Customer.create(req.body, function(err, customer){
	  					if(err){
	    				console.log("error creating a customer");
	  				}
	  				else{
	    				res.json(customer);
	  				}
	     			})
   				}
   				else{
   					console.log("user already exists..");
   					res.json({error: "User already exists"});
   				}
   			}
   		})

   		
  	 	
	};

	this.index_new = function(req, res){

		Customer.find().sort({ createdAt: 'desc'}).limit(3).exec(function(err, customers){
			if(err){
				console.log('error getting most recent customers');
			}
			else{
				console.log(customers);
				res.json(customers);
			}
		})
	};

	// this.update = function(req, res){
	// 	console.log("server - update product id: "+ req.params.id);
	// 	Product.findOne({_id: req.params.id}, function(err, product){
 //      		if(err){
 //        		console.log(err);
 //      		}
 //      		else{
 //      			console.log("update in server...");
 //      			console.log(req.body.name);
 //        			product.name = req.body.name;
 //        			product.image_url = req.body.image_url;
 //        			product.description = req.body.description;
 //        			product.save(function(err, updatedProduct){
 //          			if (err){
 //            			console.log("error updating the product..");
 //          			}else{
 //            			res.json(updatedProduct);
 //          			}
 //        		})
 //      		}
 //    	})

	// };

	this.delete = function(req, res){
		console.log("server - delete customer id: "+ req.params.id);
		var ok_to_delete = false;

		// first have to delete the orders that are associated with this customer

		Order.remove({_customer: req.params.id}, function(err){
			if (err){
				console.log('error deleting an Order associated with a customer');
			}
			else{
				console.log('successfully deleted an Order associated with a customer..deleting customer..');

				Customer.remove({_id: req.params.id}, function(err){
					if (err){
						console.log('error deleting a Customer object from db');
					}
					else{
						console.log('successfully deleted a Customer object from db');
					   
			    		res.json({message: 'Customer ID ' + req.params.id + ' Deleted OK'});
					}
				})

			}
		})

			

		
	};
}


module.exports = new CustomersController();