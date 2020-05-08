const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ProductsSchema = require("./products").schema;
const CustomersSchema = require("./customers").schema;

// Create Customers Schema
const MerchantSchema = new Schema({
  brandName: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique:true,
  },
  password: {
    type: String,
    required: true,
  },
  products:[ProductsSchema],
  
});

module.exports = mongoose.model("merchants", MerchantSchema);
