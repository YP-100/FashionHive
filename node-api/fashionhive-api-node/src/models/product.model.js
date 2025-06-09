const mongoose = require("mongoose");
const { Schema } = mongoose;

const orderItemSchema = new Schema({
    title:{
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    discountedPrice: {
        type: Number,
    },
    discountedPersent:{
        type: Number,
    },
    quantity:{
        type: Number,
        required: true,
    },
    brand:{
        type: String,
    },
    color:{
        type: String,
    },
    size: [
        {
            name:{type:String},
            quantity:{type: Number}
        }
    ],
    imageUrl:{
        type: String,
    },
    ratings:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "ratings"
    }],
    numRatings:{
        type: Number,
        default: 0
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "categories"
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    },
    reviews:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "reviews"
    }],
});

// const Product = mongoose.model("products", orderItemSchema);
// module.exports = Product;

module.exports = mongoose.models.products || mongoose.model("products", orderItemSchema);
