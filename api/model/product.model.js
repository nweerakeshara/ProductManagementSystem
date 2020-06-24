const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/*
    Image Schema for storing images in the
    mongodb database
*/
var ProductSchema = new Schema({
    product_id : {
        type : String
    },
    product_name : {
        type : String
    },
    product_price : {
        type : Number
    },
    product_discount : {
        type : Number
    },
    product_category: {
        type: String,
        default: 'No category'
    },
    imageName: {
        type: String,
        default: "none",
        required: true
    },
    imageData: {
        type: String,
        required: true
    }
},{
    collection : 'products'
});

var Product = mongoose.model('Product', ProductSchema);

module.exports = Product;
