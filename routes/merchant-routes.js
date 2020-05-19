const express = require("express");
const router = express.Router();


const merchantCtrl = require('../controller/merchants-ctrl')

// @route POST api/merchant/register
// @desc Register Merchant
// @access Public
router.post("/merchant/register",merchantCtrl.createMerchant);

// @route POST api/merchant/register
// @desc Login Merchant
// @access Public
router.post("/merchant/login",merchantCtrl.doLogin);

// @route GET api/merchant/{merchantID}}
// @desc All merchant info
// @access Public
router.get("/merchant/:id",merchantCtrl.getMerchant);
    

module.exports = router
