const mongoose = require("mongoose")

const orderSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    district: {
        type: String,
        required: true,
    },
    deliveryCharge: {
        type: Number,
        default: 0,
        required: false,
    },
    size: {
        type: String,
        required: true,
    },
    quantity: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        default: "Pending",
        required: false,
    },
    product: {
        type: Object,
        required: true,
    },
    finalPrice: {
        type: Number,
        required: true,
    },
})



module.exports = mongoose.model("Order", orderSchema)