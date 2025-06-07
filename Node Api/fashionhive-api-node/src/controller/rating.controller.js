const ratingService = require('../services/rating.service.js');




const createRating= async(req, res) => {
    const user = req.user;
    try {
        const ratings = await ratingService.createRating(req.body,user);
        return res.status(201).send(ratings);
    } catch (error) {
        return res.status(500).send({ error: error.message });
    }
}


const getAllRating= async(req, res) => {
    const productId = req.params.productId;
    const user = req.user;
    try {
        const ratings = await ratingService.getProductRating(productId);
        return res.status(201).send(ratings);
    } catch (error) {
        return res.status(500).send({ error: error.message });
    }
}



const updateRating = async (req, res) => {
    const user = req.user;
    const { productId, rating } = req.body;

    try {
        const updated = await ratingService.updateRating(productId, rating, user);
        return res.status(200).send(updated);
    } catch (error) {
        return res.status(500).send({ error: error.message });
    }
};
const deleteRating = async (req, res) => {
    const user = req.user;
    const productId = req.params.productId;

    try {
        const deleted = await ratingService.deleteRating(productId, user);
        return res.status(200).send({ message: "Rating deleted successfully" });
    } catch (error) {
        return res.status(500).send({ error: error.message });
    }
};


module.exports ={
    createRating,
    getAllRating,
    updateRating,
    deleteRating
}