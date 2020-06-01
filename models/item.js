const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Customers Schema
const ItemSchema = new Schema({
  img: [{
    data: Buffer,
    contentType: String,
  }],
});

module.exports = mongoose.model("item", ItemSchema);
