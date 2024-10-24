const express = require("express");
const { createPost, getPostOfJob, getCategary } = require("../controllers/Post");
const { isAuthenticated } = require("../middlewares/auth");
const router = express.Router();

router.route("/postjob").post(isAuthenticated, createPost);



module.exports = router;