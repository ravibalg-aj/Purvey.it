const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ProductsSchema = require("./products").schema;
const StorySchema = require("./story").schema;


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
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  products: [ProductsSchema],
  story: StorySchema,
});

module.exports = mongoose.model("merchants", MerchantSchema);
