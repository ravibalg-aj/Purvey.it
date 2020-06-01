const express = require("express");

//Validator
const validateShippingInput = require("../validators/shipping-check");
//Importing model
const merchants = require("../models/merchants");
const products = require("../models/products");
const customers = require("../models/customers");
const shipping = require("../models/shipping");

const isEmpty = require("is-empty");

const _ = require("lodash");

makeShipping = async (req, res) => {
  console.log(req.body);
  body = req.body;
  merchantId = req.params.id;

  const { errors, isValid } = validateShippingInput(body);

  if (!isValid) {
    res.status(400).json({ errors: errors });
  } else {
    merchants.findById(body.to, (err, merchant) => {
      if (err) {
        res.status(400).json({ errors: err });
      }
      if (!merchant) {
        res.status(400).json({ errors: "Merchant not found" });
      } else {
        customers.findById(body.from, (err, customer) => {
          if (err) {
            res.status(400).json({ errors: err });
          }
          if (!customer) {
            res.status(400).json({ errors: "Customer not found" });
          } else {
            if (!isEmpty(customer.cart)) {
              const newShipping = new shipping({
                from: body.from,
                to: body.to,
                status: "ORDER_RECEIVED",
                tokenId: body.tokenId,
                cart: customer.cart,
                shippingAddress: body.shippingAddress,
                totalPrice: body.totalPrice,
              });

              newShipping
                .save()
                .then((shipping) => {
                  customer.cart = [];
                  customer.markModified("cart");
                  customer
                    .save()
                    .then((customer) => {
                      res.json({ data: shipping });
                    })
                    .catch((err) => res.status(400).json({ errors: err }));
                })
                .catch((err) => res.status(400).json({ errors: err }));
            } else {
              res.status(400).json({ errors: "No item in Cart!" });
            }
          }
        });
      }
    });
  }
};

changeShippingStatus = async (req, res) => {
  const shippingId = req.params.id;
  const status = req.params.status;

  shipping.findById(shippingId, (err, shipping) => {
    if (err) {
      res.status(400).json({ errors: err });
    }
    if (!shipping) {
      res.status(400).json({ errors: "ShippingId Not found" });
    } else {
      if (status === "1") {
        shipping.status = "ORDER_PROCESSING";

        shipping
          .save()
          .then((shipping) => {
            res.json({ data: shipping });
          })
          .catch((err) => res.status(400).json({ errors: err }));
      } else if (status === "2") {
        shipping.status = "ORDER_DELIVERED";

        shipping
          .save()
          .then((shipping) => {
            res.json({ data: shipping });
          })
          .catch((err) => res.status(400).json({ errors: err }));
      } else if (status === "3") {
        shipping.status = "ORDER_CANCELLED";
        shipping
          .save()
          .then((shipping) => {
            res.json({ data: shipping });
          })
          .catch((err) => res.status(400).json({ errors: err }));
      } else {
        res.status(400).json({ errors: "Status code is not valid" });
      }
    }
  });
};

makeShippingIssue = async (req, res) => {
  const issueMessage = req.body.issueMessage;
  const shippingId = req.params.id;

  shipping.findById(shippingId, (err, shipping) => {
    if (err) {
      res.status(400).json({ errors: err });
    }
    if (!shipping) {
      res.status(400).json({ errors: "ShippingId not found" });
    } else {
      shipping.issueMessage = issueMessage;

      shipping
        .save()
        .then((shipping) => {
          res.json({ data: shipping });
        })
        .catch((err) => res.status(400).json({ errors: err }));
    }
  });
};


module.exports = {
  makeShipping,
  changeShippingStatus,
  makeShippingIssue,
};
