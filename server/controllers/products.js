console.log('products controller');
var mongoose = require('mongoose');
var Product = mongoose.model('Product');
var Order = mongoose.model('Order');


function ProductsController(){

	this.index = function(req, res){
		console.log("server - inside products controller - index");

		Product.find({}, function(err, products){
			if (err){
				console.log('error getting products from db')
			}
			else{
				console.log('successfully retrieved products from db')
				console.log(products);
				for (var i in products){
					console.log(products[i].name);
				}
			   
	    		res.json(products);	
			}
		})
	};

	this.create = function(req, res) {
   		console.log("server - inside product create controller")
   		console.log(req.body);
  	 	Product.create(req.body, function(err, result){
      		if(err){
        	console.log("error creating a product");
      		}
      		else{
      			console.log("successfully created a product");
        		res.json(result);
      		}
    	})
	};


	this.delete = function(req, res){
		console.log("server - delete product id: "+ req.params.id);

		// first remove all orders associated with this product
		Order.remove({_product: req.params.id}, function(err){
			if(err){
				console.log('error deleting Orders associated with a product');
			}
			else{
				console.log('successfully deleted all Orders associated with a product');
				
				Product.remove({_id: req.params.id}, function(err){
				if (err){
					console.log('error deleting a Product object from db');
				}
				else{
					console.log('successfully deleted an Product object from db');
				   
		    		res.json({message: 'Product ID ' + req.params.id + ' Deleted OK'});
				}
			})
			}
		})

	};
}


module.exports = new ProductsController();