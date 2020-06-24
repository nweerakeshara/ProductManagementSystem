const mongoose = require('mongoose');




const productsSchema = mongoose.Schema({

    name: {
        type: String

    },


    des: {
        type: String

    },

    qty : {
        type:String

    },
    qty : {
        type:String

    },
    usrId : {
        type:String

    },


})


const Products = mongoose.model('Products', productsSchema);
module.exports = {Products};


