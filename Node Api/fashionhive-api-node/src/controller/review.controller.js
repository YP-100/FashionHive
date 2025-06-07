const reviewService = require('../services/review.service.js');




const createReview= async(req, res) => {
    const user = req.user;
    try {
        // const review = await reviewService.createReview(req.body,user);

        const review = await reviewService.createReview({ ...req.body, productId: req.params.productId }, user);


        return res.status(201).send(review);
    } catch (error) {
        return res.status(500).send({ error: error.message });
    }
}


const getAllReview= async(req, res) => {
    const productId = req.params.productId;
    const user = req.user;
    try {
        const reviews = await reviewService.getAllReview(productId);
        return res.status(201).send(reviews);
    } catch (error) {
        return res.status(500).send({ error: error.message });
    }
}

const deleteReview = async (req, res) => {
    const user = req.user;
    const reviewId = req.params.reviewId;

    try {
        const result = await reviewService.deleteReview(reviewId, user);
        return res.status(200).send(result);
    } catch (error) {
        return res.status(500).send({ error: error.message });
    }
};

const getAllReviewsByUser = async (req, res) => {
    const userId = req.params.userId;

    if (req.user._id !== userId) {
        return res.status(403).send({ error: "You can only view your own reviews." });
    }

    try {
        const reviews = await reviewService.getAllReviewsByUser(userId);
        return res.status(200).send(reviews);
    } catch (error) {
        return res.status(500).send({ error: error.message });
    }
};

const updateReview = async (req, res) => {
    const user = req.user;
    const reviewId = req.params.reviewId;

    try {
        const updatedReview = await reviewService.updateReview(reviewId, user, req.body);
        return res.status(200).send(updatedReview);
    } catch (error) {
        return res.status(500).send({ error: error.message });
    }
};


module.exports ={
    createReview,
    getAllReview,
    deleteReview,
    getAllReviewsByUser,
    updateReview
}