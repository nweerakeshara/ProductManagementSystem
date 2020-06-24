const express = require("express");
const router = express.Router();
const {Products} = require('../model/products');

//add items to the comments
router.post("/add", (req, res) => {
    let Products = new Products(req.body);
    Products
        .save()
        .then((data) => {
            res.json({ success: true });
        })
        .catch((err) => {
            res.json({ success: false });
        });
});

//get items from comments
router.get("/get/:id", (req, res) => {

    Comm.find({product_id: req.params.id},function (err, comments) {
        if (err) console.log(err);
        else {
            res.json(comments);
        }
    });
});


module.exports = Comments;