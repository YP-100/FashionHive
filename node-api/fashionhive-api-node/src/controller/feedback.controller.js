const feedbackService = require('../services/feedback.service.js');

const createFeedback = async(req, res) => {
    const user = req.user;
    try {
        const feedback = await feedbackService.createFeedback(req.body, user);
        return res.status(201).send(feedback);
    } catch (error) {
        return res.status(500).send({ error: error.message });
    }
}

const getFeedback = async(req, res) => {
    const user = req.user;
    try {
        const feedback = await feedbackService.getFeedbackByUser(user._id);
        if (!feedback) {
            return res.status(404).send({ message: "No feedback submitted yet" });
        }
        return res.status(200).send(feedback);
    } catch (error) {
        return res.status(500).send({ error: error.message });
    }
}

const updateFeedback = async(req, res) => {
    const user = req.user;
    try {
        // Get the feedback ID from the user's record
        const feedback = await feedbackService.getFeedbackByUser(user._id);
        if (!feedback) {
            return res.status(404).send({ message: "No feedback found to update" });
        }

        const updatedFeedback = await feedbackService.updateFeedback(feedback._id, user, req.body);
        return res.status(200).send(updatedFeedback);
    } catch (error) {
        return res.status(500).send({ error: error.message });
    }
}

const deleteFeedback = async(req, res) => {
    const user = req.user;
    try {
        // Get the feedback ID from the user's record
        const feedback = await feedbackService.getFeedbackByUser(user._id);
        if (!feedback) {
            return res.status(404).send({ message: "No feedback found to delete" });
        }

        const result = await feedbackService.deleteFeedback(feedback._id, user);
        return res.status(200).send(result);
    } catch (error) {
        return res.status(500).send({ error: error.message });
    }
}

const getAllFeedback = async(req, res) => {
    try {
        const feedbacks = await feedbackService.getAllFeedback();
        return res.status(200).send(feedbacks);
    } catch (error) {
        return res.status(500).send({ error: error.message });
    }
}

module.exports = {
    createFeedback,
    getFeedback,
    updateFeedback,
    deleteFeedback,
    getAllFeedback
};