const express = require("express");

//Validator
const validateProductInput = require("../validators/product-check");
//Importing model
const merchants = require("../models/merchants");
const products = require("../models/products");
const customers = require("../models/customers")

createProduct = async (req, res) => {
  body = req.body;
  merchantId = req.params.id;

  const { errors, isValid } = validateProductInput(body);

  if (!isValid) {
    res.status(400).json({ errors: errors });
  }

  merchants.findOne({ _id: merchantId }, (err, merchant) => {
    if (err) {
      res.status(400).json({ errors: err });
    }
    if (!merchant) {
      res.status(400).json({ errors: "Merchant not found!" });
    }
    const newProduct = new products({
      name: body.name,
      description: body.description,
      price: body.price,
    });

    merchant.products.push(newProduct);

    merchant
      .save()
      .then((merchant) => res.json({data: merchant}))
      .catch((err) => res.status(400).json({ errors: err }));
  });
};


addWishlist = async(req, res) => {
    body = req.body;
    customerId = req.params.id;
  
    const { errors, isValid } = validateProductInput(body);
  
    if (!isValid) {
      res.status(400).json({ errors: errors });
    }
  
    customers.findOne({ _id: customerId }, (err, customer) => {
      if (err) {
        res.status(400).json({ errors: err });
      }
      if (!customer) {
        res.status(400).json({ errors: "Customer not found!" });
      }
      const newProduct = new products({
        name: body.name,
        description: body.description,
        price: body.price,
      });
  
      customer.wishlist.push(newProduct);
  
      customer
        .save()
        .then((customer) => res.json({data: customer}))
        .catch((err) => res.status(400).json({ errors: err }));
    });}

    
module.exports = {createProduct, addWishlist}
