// require mongoose
var mongoose = require('mongoose');

var CustomerSchema = new mongoose.Schema({
 name: {type: String, required: true, minlength: 1}},
 {timestamps: true });

mongoose.model('Customer', CustomerSchema); 