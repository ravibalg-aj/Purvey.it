const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ProductsSchema = require('./products').schema


// Create Customers Schema
const CustomerSchema = new Schema({
    name: {
        type: String,
        required: true,
        default:"",
    },
    email: {
        type: String,
        required: true,
        default:""
    },
    password: {
        type: String,
        required: true,
        default:""
    },
    cart:[ProductsSchema],
    merchantId:{
        type:mongoose.ObjectId,
        required:true,    
    }
});

module.exports = mongoose.model("customers", CustomerSchema);
