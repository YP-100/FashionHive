const Rating = require("../models/rating.model.js");
const productService = require("../services/product.service.js");


async function createRating(req, user) {
    const product = await productService.findProductById(req.productId);

    // Check if the rating already exists
    const existingRating = await Rating.findOne({ user: user._id, product: product._id });

    if (existingRating) {
        throw new Error("You have already rated this product. Use update instead.");
    }

    const ratings = new Rating({
        product: product._id,
        user: user._id,
        ratings: req.rating,
        createdAt: new Date(),
    });

    const savedRating = await ratings.save();
    
    // Add rating to user's ratings array
    user.ratings.push(savedRating._id);
    await user.save();
    
    // Add rating to product's ratings array
    product.ratings.push(savedRating._id);
    await product.save();

    return savedRating;
}


async function getProductRating(productId){
    return await Rating.find({product:productId});
}




async function updateRating(productId, ratingValue, user) {
    const ratings = await Rating.findOne({ product: productId, user: user._id });

    if (!ratings) {
        throw new Error("Rating not found");
    }

    ratings.ratings = ratingValue;
    await ratings.save();
    return ratings;
}

async function deleteRating(productId, user) {
    const ratings = await Rating.findOneAndDelete({ product: productId, user: user._id });

    if (!ratings) {
        throw new Error("Rating not found or already deleted");
    }

    user.ratings.pull(ratings._id);
    await user.save();

    const product = await productService.findProductById(productId);
    product.ratings.pull(ratings._id);
    await product.save();

    return ratings;
}

module.exports = {
    createRating,
    getProductRating,
    updateRating,
    deleteRating
}
