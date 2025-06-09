const mongoose = require("mongoose");

const feedbackSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true,
        unique: true // Ensures one feedback per user
    },
    likes: {
        type: String,
        trim: true
    },
    dislikes: {
        type: String,
        trim: true
    },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    },
    suggestions: {
        type: String,
        trim: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    }
});

const Feedback = mongoose.model("feedbacks", feedbackSchema);
module.exports = Feedback;