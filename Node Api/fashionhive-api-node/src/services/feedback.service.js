const Feedback = require("../models/feedback.model.js");
const User = require("../models/User.model.js");

async function createFeedback(reqData, user) {
    // Check if user already submitted feedback
    const existingFeedback = await Feedback.findOne({ user: user._id });
    if (existingFeedback) {
        throw new Error("You have already submitted feedback Thank YOU !.");
    }

    const feedback = new Feedback({
        user: user._id,
        likes: reqData.likes,
        dislikes: reqData.dislikes,
        rating: reqData.rating,
        suggestions: reqData.suggestions || ""
    });

    await feedback.save();

    // Add feedback reference to user
    const dbUser = await User.findById(user._id);
    dbUser.feedback = feedback._id;
    await dbUser.save();

    return feedback;
}

async function getFeedbackByUser(userId) {
    return await Feedback.findOne({ user: userId }).populate("user");
}

async function updateFeedback(feedbackId, user, updatedData) {
    const feedback = await Feedback.findById(feedbackId);

    if (!feedback) {
        throw new Error("Feedback not found");
    }

    // Ensure only the feedback owner can update
    if (feedback.user.toString() !== user._id.toString()) {
        throw new Error("You are not authorized to edit this feedback");
    }

    feedback.likes = updatedData.likes || feedback.likes;
    feedback.dislikes = updatedData.dislikes || feedback.dislikes;
    feedback.rating = updatedData.rating || feedback.rating;
    feedback.suggestions = updatedData.suggestions || feedback.suggestions;
    feedback.updatedAt = new Date();

    return await feedback.save();
}

async function deleteFeedback(feedbackId, user) {
    const feedback = await Feedback.findById(feedbackId);
    if (!feedback) {
        throw new Error("Feedback not found");
    }

    // Ensure the logged-in user is the owner
    if (feedback.user.toString() !== user._id.toString()) {
        throw new Error("You are not authorized to delete this feedback");
    }

    // Remove feedback reference from the user
    const dbUser = await User.findById(user._id);
    dbUser.feedback = undefined;
    await dbUser.save();

    await Feedback.findByIdAndDelete(feedbackId);
    return { message: "Feedback deleted successfully" };
}

async function getAllFeedback() {
    return await Feedback.find().populate("user", "firstName lastName email");
}

module.exports = {
    createFeedback,
    getFeedbackByUser,
    updateFeedback,
    deleteFeedback,
    getAllFeedback
};