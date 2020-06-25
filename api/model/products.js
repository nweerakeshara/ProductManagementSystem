const mongoose = require('mongoose');




const productSchema = mongoose.Schema({

    name: {
        type: String

    },


    des: {
        type: String

    },

    qty : {
        type:String

    },

    userId : {
        type:String

    },


})


const Products = mongoose.model('Products', productSchema);
module.exports = {Products};


