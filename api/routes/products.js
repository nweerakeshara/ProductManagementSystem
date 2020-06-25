const paginate = require('jw-paginate');
const express = require('express');
const router = express.Router();
const {Products} = require('../model/products');

router.get('/get/all/paginate', (req,res) => {
   Products.find().then(items => {

      const page = parseInt(req.query.page) || 1;

      // get size of items that should display
      const pageSize = 10;
      const pager = paginate(items.length, page, pageSize);

      // get the page number from item list
      const pageOfItems = items.slice(pager.startIndex, pager.endIndex + 1);

      // return pagination related data and items in the selected page
      return res.json({ pager, pageOfItems });

   });


});

/////////////////////////////////////////////////////////////////////////////////////////////////////////////



router.get('/get/all/paginate/search', (req,res) => {
   Products.find({ name: new RegExp(req.query.sitem, 'i')   }).then(items => {

      const page = parseInt(req.query.page) || 1;

      // get size of items that should display
      const pageSize = 10;
      const pager = paginate(items.length, page, pageSize);

      // get the page number from item list
      const pageOfItems = items.slice(pager.startIndex, pager.endIndex + 1);

      // return pagination related data and items in the selected page
      return res.json({ pager, pageOfItems });

   });


});

//////////////////////////////////////////////////////////////
router.get("/getProduct/:id", (req, res)=> {
   let id = req.params.id;
   Products.findById(id, function (err, product) {
      res.json(product);
   });
});

/////////////////////////////////////////////////////////////////
router.post("/add", (req, res) => {
   const products = new Products(req.body);
   products.save()
       .then((data) => {
          res.json({ success: true });
       })
       .catch((err) => {
          res.json({ success: false });
       });
});

module.exports = router;