const Review = require("../models/review.model.js");
const productService = require("./product.service");
const User = require("../models/User.model.js");
const reviewService = require("./review.service.js");

async function createReview(reqData, user) {
    const product = await productService.findProductById(reqData.productId);
  
    const existingReview = await Review.findOne({
      user: user._id,
      product: product._id,
    });
    if (existingReview) {
      throw new Error("You have already reviewed this product.");
    }
  
    const review = new Review({
      user: user._id,
      product: product._id,
      review: reqData.review,
      createdAt: new Date(),
    });
  
    await review.save();
  
    // Add review to product
    product.reviews.push(review._id);
    await product.save();
  
    // Add review to user
    const dbUser = await User.findById(user._id);
    dbUser.reviews.push(review._id);
    await dbUser.save();
  
    return review;
  }
  

async function getAllReview(productId) {
  const product = await productService.findProductById(productId);

  return await Review.find({ product: productId }).populate("user");
}

// async function deleteReview(reviewId, user) {
//   const review = await Review.findById(reviewId);
//   if (!review) {
//     throw new Error("Review not found");
//   }

//   // Ensure the logged-in user is the owner
//   if (review.user.toString() !== user._id.toString()) {
//     throw new Error("You are not authorized to delete this review");
//   }

//   await Review.findByIdAndDelete(reviewId);
//   return { message: "Review deleted successfully" };
// }

async function deleteReview(reviewId, user) {
    const review = await Review.findById(reviewId);
    if (!review) {
      throw new Error("Review not found");
    }
  
    // Ensure the logged-in user is the owner
    if (review.user.toString() !== user._id.toString()) {
      throw new Error("You are not authorized to delete this review");
    }
  
    // Remove review reference from the product
    await productService.findProductById(review.product).then(async (product) => {
      product.reviews.pull(review._id);
      await product.save();
    });
  
    // Remove review reference from the user
    const dbUser = await User.findById(user._id);
    dbUser.reviews.pull(review._id);          
    await dbUser.save();                       
  
    await Review.findByIdAndDelete(reviewId);
    return { message: "Review deleted successfully" };
  }
  

const getAllReviewsByUser = async (req, res) => {
  const user = req.user;

  try {
    const reviews = await reviewService.getAllReviewsByUser(user._id);
    return res.status(200).send(reviews);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

async function updateReview(reviewId, user, updatedData) {
  const review = await Review.findById(reviewId);

  if (!review) {
    throw new Error("Review not found");
  }

  // Ensure only the review owner can update
  if (review.user.toString() !== user._id.toString()) {
    throw new Error("You are not authorized to edit this review");
  }

  review.review = updatedData.review || review.review;
  review.updatedAt = new Date();

  return await review.save();
}

module.exports = {
  createReview,
  getAllReview,
  deleteReview,
  getAllReviewsByUser,
  updateReview,
};
