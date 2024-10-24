const express = require("express");
const { register, login, logout, applyForJob, allJobs, getPostOfJob, getCategary } = require("../controllers/User");
const { isAuthenticated } = require("../middlewares/auth");
const { signupValidation, loginValidation } = require("../middlewares/authValidation");
const router = express.Router();

router.route("/signup").post(signupValidation, register);

router.route("/login").post(loginValidation, login);

router.route("/logout").get(isAuthenticated, logout);


router.route("/alljobs").get(isAuthenticated, allJobs);

router.route("/apply/:id").get(isAuthenticated, applyForJob);

router.route("/jobdetails/:id").post(isAuthenticated, getPostOfJob);

router.route("/view/:name").post(isAuthenticated, getCategary);

module.exports = router;