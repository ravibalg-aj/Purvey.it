const express = require("express");
const router = express.Router();

const customersCtrl = require('../controller/customers-ctrl')

// @route POST api/{merchantid}/customer/register
// @desc Register Customer
// @access Public
router.post("/customer/register/:id",customersCtrl.createCustomer);

// @route POST api/{merchantid}/customer/login
// @desc Login Customer
// @access Public
router.post("/customer/login/:id",customersCtrl.doLogin);
    
// @route GET api/merchant/customers/{merchantID}}
// @desc All Customer/mercahnt info
// @access Public
router.get("/customer/merchant/:id",customersCtrl.getMerchantCustomers);

// @route GET api/customers/{merchantID}}
// @desc Cusotmer info
// @access Public
router.get("/customer/:id",customersCtrl.getCustomer);

module.exports = router
