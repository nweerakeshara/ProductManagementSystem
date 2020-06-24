const mongoose = require('mongoose');




const userSchema = mongoose.Schema({



    email: {
        type:String,
        trim: true,
        unique: 1
    },

    fName: {
        type:String

    },

    lName: {
        type:String

    },

    userPw: {
        type:String

    },

    phone: {
        type:String

    },

    addr: {
        type:String

    },

    date : {
        type:Date,
        default:Date.now()
    },

    token : {
        type: String
    },


})





const User = mongoose.model('User', userSchema);
module.exports = {User};