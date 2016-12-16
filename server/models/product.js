// require mongoose
var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var ProductSchema = new mongoose.Schema({
 name: {type: String, required: true, minlength: 1},
 image_url: {type: String},
 description: {type: String},
 quantity: {type: Number}},
 {timestamps: true });

mongoose.model('Product', ProductSchema); 