const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },

    email: {
        type: String,
        required: true,
    },

    address: {
        type: String,
        required: true,
    },

    mobile: {
        type: Number,
        required: true,
    },

    date: {
        type: Date,
        default: Date.now,
        required: true,
    },

    education: {
        type: String,
        required: true,
    },

    college: {
        type: String,
        required: true,
    },

    resume: {
        type: Buffer,
    },

    password: {
        type: String,
        required: true,
    },

    apply: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        }
    ],

});

userSchema.methods.generateToken = function () {
    return jwt.sign({ _id: this._id }, process.env.JWT_KEY);
};

module.exports = mongoose.model("User", userSchema);