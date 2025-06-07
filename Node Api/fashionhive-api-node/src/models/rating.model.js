const mongoose = require("mongoose");
const { Schema } = mongoose;

const ratingSchema = new Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true, 
    },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "products",
        required: true,
    },
    ratings: {
        type: Number,
        required: true,
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now(),
    },
});

const Rating = mongoose.model("ratings", ratingSchema);
module.exports = Rating;