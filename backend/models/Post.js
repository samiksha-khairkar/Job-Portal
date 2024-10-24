const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },

    company: {
        type: String,
        required: true,
    },

    location:
    {
        type: String,
        required: true,
    },

    description: {
        type: String,
    },


    categary: {
        type: String,
    },

    salary: {
        type: Number,
        required: true,
    },

    appliedBy: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Post",
        }
    ]

});

module.exports = mongoose.model("Post", postSchema);