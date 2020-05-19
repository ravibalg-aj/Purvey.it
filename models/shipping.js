const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ProductsSchema = require("./products").schema;
const CustomersSchema = require("./customers").schema;

// Create Customers Schema
const ShippingSchema = new Schema(
  {
    from: {
      type: String,
      required: true,
    },
    to: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
    tokenId: {
      type: String,
      required: true,
    },
    cart: [ProductsSchema],
    shippingAddress: {
      type: String,
      required: true,
    },
    issueMessage: {
      type: String,
    },
    totalPrice: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("shipping", ShippingSchema);
