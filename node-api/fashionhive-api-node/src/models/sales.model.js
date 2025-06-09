const mongoose = require("mongoose");
const { Schema } = mongoose;

const salesSchema = new Schema({
    date: {
        type: Date,
        default: Date.now,
        required: true
    },
    totalSales: {
        type: Number,
        required: true,
        default: 0
    },
    totalItemsSold: {
        type: Number,
        required: true,
        default: 0
    },
    order: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "orders"
    }
}, { timestamps: true });

const Sales = mongoose.model("sales", salesSchema);
module.exports = Sales;