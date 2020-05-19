const express = require("express");
const router = express.Router();
const passport = require("passport");

const customersCtrl = require("../controller/customers-ctrl");

// @route POST api/customer/register/{merchantid}
// @desc Register Customer
// @access Public
router.post("/customer/register/:id", customersCtrl.createCustomer);

// @route POST api/customer/login/{merchantid}
// @desc Login Customer
// @access Public
router.post("/customer/login/:id", customersCtrl.doLogin);

// @route GET api/merchant/customer/{merchantID}}
// @desc All Customer/mercahnt info
// @access Public
router.get(
  "/customer/merchant/:id",
  passport.authenticate("customer", { session: false }),
  customersCtrl.getMerchantCustomers
);

// @route GET api/customer/{merchantID}}
// @desc Customer info
// @access Public
router.get(
  "/customer/:id",
  passport.authenticate("customer", { session: false }),
  customersCtrl.getCustomer
);

// @route GET api/customer/orders/{merchantID}/{customerId}}
// @desc Customer Orders info
// @access Public
router.get(
  "/customer/orders/:id/:customerId",
//   passport.authenticate("customer", { session: false }),
  customersCtrl.getOrders
);

module.exports = router;
