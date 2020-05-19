const express = require("express");
const router = express.Router();

const shippingCtrl = require('../controller/shipping-ctrl.js')

// @route POST api/shipping
// @desc Add Shipping Info
// @access Public
router.post("/shipping",shippingCtrl.makeShipping);


// @route POST api/shipping/{shippingId}/{Statuscode}
// @desc Change order status
// @access Public
router.post("/shipping/status/:id/:status",shippingCtrl.changeShippingStatus);

// @route POST api/shipping/issue/{shippingId}
// @desc Create Shipping Issue
// @access Public
router.post("/shipping/issue/:id",shippingCtrl.makeShippingIssue);

module.exports = router
