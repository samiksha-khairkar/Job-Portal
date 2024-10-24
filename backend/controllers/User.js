const User = require("../models/User");
const Post = require("../models/Post");
const jwt = require("jsonwebtoken")

exports.register = async (req, res) => {
    try {
        const { name, email, address, mobile, date, education, college, password } = req.body;
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400)
                .json({
                    success: false,
                    message: "User  already exists"
                });
        }

        user = await User.create({
            name,
            email,
            address,
            mobile,
            date,
            education,
            college,
            password
        });

        const token = await user.generateToken();

        const options = {
            expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
            httpOnly: true
        };


        res.status(201).cookie("token", token, options).json({
            success: true,
            user,
            token,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email }).select("+password");

        if (!user) {
            return res.status(400).json({
                success: false,
                message: "User does not exist"
            });
        }



        if (user.password === password) {
            const token = await user.generateToken();

            const options = {
                expires: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
                httpOnly: true
            };


            res.status(200).cookie("token", token, options).json({
                success: true,
                user,
                token,
            });

        } else {
            return res.status(400).json({
                success: false,
                message: "Incorrect password",
            });
        }


    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};


exports.logout = async (req, res) => {
    try {
        res.status(200).cookie("token", null, {
            expires: new Date(Date.now()),
            httpOnly: true,
        }).json({
            success: true,
            message: "Logged out",
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}

exports.allJobs = async (req, res) => {
    try {
        const posts = await Post.find();

        res.status(200).json({
            success: true,
            posts,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}

exports.getPostOfJob = async (req, res) => {
    try {
        const post = await Post.findById(req.body.id);

        res.status(200).json({
            success: true,
            post,
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}



exports.applyForJob = async (req, res) => {
    try {
        const jobToApply = await Post.findById(req.params.id);
        const user = await User.findById(req.user._id);

        if (!jobToApply) {
            return res.status(404).json({
                success: false,
                message: "Job not found",
            });
        }

        if (user.apply.includes(jobToApply._id)) {
            res.status(400).json({
                success: false,
                message: "You already applied"
            });
        } else {
            user.apply.push(jobToApply._id);
            jobToApply.appliedBy.push(user._id);

            await user.save();
            await jobToApply.save();

            res.status(200).json({
                success: true,
                message: "Successfully Applied"
            });
        }


    } catch (error) {
        res.status(500).json({
            success: true,
            message: error.message,
        });
    }
}

exports.getCategary = async (req, res) => {
    try {
        const { name } = req.body;
        console.log(name);
        const posts = await Post.find({ title: name });
        console.log(posts);

        if (!posts) {
            return res.status(404).json({
                success: false,
                message: "Job not found",
            });
        }

        res.status(200).json({
            success: true,
            posts,
        });
    } catch (error) {
        res.status(500).json({
            success: true,
            message: error.message,
        });
    }

}

exports.uploadResume = async (req, res) => {
    try {

    } catch (error) {
        res.status(500).json({
            success: true,
            message: error.message,
        });
    }
}