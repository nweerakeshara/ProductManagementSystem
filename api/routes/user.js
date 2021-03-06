const express = require('express');
const router = express.Router();
const {User} = require('../model/user');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');



////////////////////////////////////////////////////////////////////////////////////////////////////////
/*To register new user*/
router.post('/register', (req,res) =>{

    //To register cus

    const {email, userPw, fName, lName, phone, addr} = req.body;
    if(!email || !userPw || !fName || !lName || !phone || !addr){
        return res.status(400).json({msg:'Please Fill All Fields'});
    }

    User.findOne({email}).then(user => {
        if(user){
            return res.status(400).json({msg : 'Email Already Exist'})
        }
    });




    const user = new User(req.body);

    /*password will be encrypted here*/
    bcrypt.genSalt(10, (err, salt) => {

        bcrypt.hash(user.userPw, saltRounds, function(error, hash) {
            if (error) {
                throw err;
            }
            user.userPw = hash;

            user.save().then(user  => {

                /*Sent to local storage and saved there*/
                jwt.sign(
                    {_id : user._id}, "secret", {expiresIn: 10},
                    (error, token) =>{
                        if(error) {
                            throw error;
                        }
                        res.json({
                            token,
                            user: {
                                _id: user._id,
                                fName: user.fName,
                                email: user.email
                            }
                        });
                    }
                );
            });

        });

    });



});

////////////////////////////////////////////////////////////////////////////////////////////////
/*for user login*/
router.post('/login', (req,res) =>{

    //To login cus

    const {email , userPw} = req.body;
    if(!email || !userPw){
        return res.status(400).json({msg:'Please Fill All Fields'});
    }

    User.findOne({email}).then(user => {
        if(!user){
            return res.status(400).json({msg : 'Invalid Email'})
        }

        bcrypt.compare(userPw, user.userPw).then(result => {
            if(!result){
                return res.status(400).json({
                    msg:'Invalid Credentials'
                });

            }

            /*Sent to local storage and saved there*/
            jwt.sign(
                {_id : user._id}, "secret", {expiresIn: 3500},
                (error, token) =>{
                    if(error) {
                        throw error;
                    }
                    res.json({
                        token,
                        user: {
                            _id: user._id,
                            fName: user.fName,
                            email: user.email
                        }
                    });
                }
            );
        });


    });


});

/////////////////////////////////////////////////////////////////////////////////////////////////


module.exports = router;