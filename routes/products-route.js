const express = require("express");
const router = express.Router();

const multer = require("multer");
// var upload = multer({ dest: 'uploads/' })

const uploader = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024, // keep images size < 5 MB
  },
});

const productCtrl = require("../controller/products-ctrl.js");

// @route POST api/product/{merchantid}
// @desc Add product
// @access Public
router.post(
  "/product/:id",
  uploader.fields([{ name: "imageUrls" }]),
  productCtrl.createProduct
);

// @route POST api/customer/wishlist/{customerId}
// @desc Add customer Wishlist
// @access Public
router.post("/customer/cart/:id", productCtrl.addWishlist);

router.get("/product/:id/:productId", productCtrl.getSpecificProduct);

router.delete("/customer/cart/:id/:productId", productCtrl.removeFromCart);

router.post("/product/update/:id", productCtrl.updateProduct);

module.exports = router;
