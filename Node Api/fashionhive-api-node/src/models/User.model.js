const mongoose = require("mongoose");


const userSchema = new mongoose.Schema({
    firstName:{
        type: String,
        required: true
    },
    lastName:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },    
    mobile:{
        type: String,
    },
    role:{
        type: String,
        required: true,
        default: "CUSTOMER"
    },
    address:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "address"
        }
    ],
    orders: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "orders",
        }
      ],
    paymentInformation:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "payment_information"
        }
    ],
    ratings:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "ratings"
        }
    ],
    reviews:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "reviews"
        }
    ],
    createdAt: {
        type: Date,
        default: Date.now(),
    },
    feedback: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "feedbacks"
    },

})

// const User = mongoose.model("users", userSchema);
// module.exports = User

module.exports = mongoose.models.users || mongoose.model("users", userSchema);
