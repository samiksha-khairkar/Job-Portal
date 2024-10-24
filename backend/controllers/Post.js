const Post = require("../models/Post");

exports.createPost = async (req, res) => {
    try {
        const newPost = {
            title: req.body.title,
            company: req.body.company,
            location: req.body.location,
            categary: req.body.categary,
            decription: req.body.description,
            salary: req.body.salary,
        };

        const post = await Post.create(newPost);

        res.status(200).json({
            success: true,
            post,
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

