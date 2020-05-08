const express = require("express");
const router = express.Router();

const productCtrl = require('../controller/products-ctrl.js')

// @route POST api/product/{merchantid}
// @desc Add product
// @access Public
router.post("/product/:id",productCtrl.createProduct);


// @route POST api/customer/wishlist/{customerId}
// @desc Add customer Wishlist
// @access Public
router.post("/customer/wishlist/:id",productCtrl.addWishlist);
    

module.exports = router
