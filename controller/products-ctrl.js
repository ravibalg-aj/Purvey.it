const express = require("express");

//Validator
const validateProductInput = require("../validators/product-check");
//Importing model
const merchants = require("../models/merchants");
const products = require("../models/products");
const customers = require("../models/customers");
const isEmpty = require("is-empty");
const _ = require("lodash");
createProduct = async (req, res) => {
  body = req.body;
  merchantId = req.params.id;

  const { errors, isValid } = validateProductInput(body);

  if (!isValid) {
    res.status(400).json({ errors: errors });
  } else {
    merchants.findOne({ _id: merchantId }, (err, merchant) => {
      if (err) {
        res.status(400).json({ errors: err });
      }
      if (!merchant) {
        res.status(400).json({ errors: "Merchant not found!" });
      } else {
        const newProduct = new products({
          name: body.name,
          description: body.description,
          price: body.price,
          imageUrls: body.imageUrls,
        });

        merchant.products.push(newProduct);

        merchant
          .save()
          .then((merchant) => res.json({ data: newProduct }))
          .catch((err) => res.status(400).json({ errors: err }));
      }
    });
  }
};

addWishlist = async (req, res) => {
  body = req.body;
  customerId = req.params.id;

  const { errors, isValid } = validateProductInput(body);

  if (!isValid) {
    res.status(400).json({ errors: errors });
  }

  if (customerId === "undefined") {
    res.status(400).json({ errors: "No Customer Id Provided!" });
  } else {
    customers.findOne({ _id: customerId }, (err, customer) => {
      if (err) {
        res.status(400).json({ errors: err });
      }
      if (!customer) {
        res.status(400).json({ errors: "Customer not found!" });
      } else {
        const newProduct = new products({
          name: body.name,
          description: body.description,
          price: body.price,
          imageUrls: body.imageUrls,
        });

        customer.cart.push(newProduct);
        customer
          .save()
          .then((customer) => res.json({ data: newProduct }))
          .catch((err) => res.status(400).json({ errors: err }));
      }
    });
  }
};

getSpecificProduct = async (req, res) => {
  const brandName = req.params.id;
  const productId = req.params.productId;

  merchants.findOne(
    { brandName: brandName },
    { password: 0 },
    (err, merchant) => {
      if (err) {
        res.status(400).json({ errors: err });
      }

      if (!merchant) {
        res.status(400).json({ errors: "Merchant Not found" });
      } else {
        var product = merchant.products.id(productId);
        if (!product) {
          res.status(400).json({ errors: "Product Not found" });
        } else {
          res.json({ data: product });
        }
      }
    }
  );
};

removeFromCart = async (req, res) => {
  const customerId = req.params.id;
  const productId = req.params.productId;

  customers.findById(customerId, (err, customer) => {
    if (err) {
      res.status(400).json({ errors: err });
    }

    if (!customer) {
      res.status(400).json({ errors: "Customer Not found" });
    } else {
      var removedProduct = _.remove(
        customer.cart,
        (product) => String(product._id) === productId
      );

      customer.markModified("cart");

      customer
        .save()
        .then((customer) => res.json({ data: removedProduct[0] }))
        .catch((err) => res.status(400).json({ errors: err }));
    }
  });
};
module.exports = {
  createProduct,
  addWishlist,
  getSpecificProduct,
  removeFromCart,
};
