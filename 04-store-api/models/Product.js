const mongoose = require("mongoose");

const ProductSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Product name is required"]
    },
    price: {
        type: Number,
        required: [true, "Product price is required"]
    },
    featured: {
        type: Boolean,
        default: false
    },
    rating: {
        type: Number,
        min: [1, "Min rating is 1"],
        max: [5, "Max rating is 5"]
    },
    company: {
        type: String,
        required: true,
        enum: {
            values: ["ikea", "liddy", "caressa", "marcos"],
            message: "{VALUE} is not supported"
        }
    },
    createdAt: {
        type: Date,
        default: Date.now(),
        immutable: true
    }
})

module.exports = mongoose.model("Product", ProductSchema);