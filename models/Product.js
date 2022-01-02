const mongoose = require("mongoose")

const ProductSchema = mongoose.Schema({
    title: {
        type: String,
        required: [true, "Name is required"],
        maxLength: [50, "Name must be less than of 50 characters"],
    },
    description: {
        type: String,
        required: false,
        maxLength: [500, "Description must be within 500 characters"]
    },
    price: {
        type: Number,
        required: [true, "Product price must be provided"]
    },
    category: {
        type: String,
        require: false,
        maxLength: [30, "Category name must be within 30 characters"]
    },
    rating: {
        type: Number
    }
})

module.exports = mongoose.model("Product", ProductSchema);