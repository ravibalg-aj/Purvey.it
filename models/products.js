const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Products Schema
const ProductsSchema = new Schema({
    name: {
        type: String,
        required: true,
        default:"",
    },
    description: {
        type: String,
        required: true,
        default:""
    },
    price: {
        type: String,
        required: true,
        default:""
    }
});

module.exports = mongoose.model("products", ProductsSchema);
