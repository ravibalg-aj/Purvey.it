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

const merchantCtrl = require("../controller/merchants-ctrl");

// @route POST api/merchant/register
// @desc Register Merchant
// @access Public
router.post("/merchant/register", merchantCtrl.createMerchant);

// @route POST api/merchant/register
// @desc Login Merchant
// @access Public
router.post("/merchant/login", merchantCtrl.doLogin);

// @route GET api/merchant/customer/{merchantID}}
// @desc All merchant info  for customer
// @access Public
router.get("/merchant/customer/:id", merchantCtrl.getMerchantForCustomer);

// @route GET api/merchant/{merchantID}}
// @desc All merchant info
// @access Public
router.get("/merchant/:id", merchantCtrl.getMerchant);

// router.get("/image/:id", merchantCtrl.viewImage);

// @route POST api/merchant/story/{merchantid}
// @desc Add product
// @access Public
router.post(
  "/merchant/story/:id",
  uploader.fields([{ name: "image" }]),
  merchantCtrl.addStory
);

// @route GET api/customer/orders/{merchantID}/{customerId}}
// @desc Customer Orders info
// @access Public
router.get(
  "/merchant/orders/:id",
  //   passport.authenticate("customer", { session: false }),
  merchantCtrl.getOrders
);

module.exports = router;
