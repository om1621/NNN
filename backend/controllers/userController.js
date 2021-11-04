const User = require("../models/userModel");
const createToken = require("../utils/createToken");
const handleErrors = require("../utils/handleErrors");
const jwt = require("jsonwebtoken");

// @desc   Creates new user
// @route  /api/user/signup
// @access Public
const userSignup = async (req, res) => {
  const { userName, email, password, lastWankedDay, wankingCount } = req.body;

  try {
    const score =
      -10 * wankingCount +
      (Math.floor((new Date() - new Date("2021/10/31")) / 86400000) -
        wankingCount) *
        2;
    const data = await User.create({
      userName,
      email,
      password,
      lastWankedDay,
      wankingCount,
      score,
    });
    const token = createToken(data._id);
    const user = { ...data._doc, password: undefined, token };
    res.json(user);
  } catch (err) {
    res.json(handleErrors(err));
  }
};

// @desc   Check user exists or not
// @route  /api/user/login
// @access Public
const userSignin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const data = await User.login(email, password);
    const token = createToken(data._id);
    const user = { ...data._doc, password: undefined, token };
    res.json(user);
  } catch (err) {
    const errorData = handleErrors(err);
    res.json(errorData);
  }
};

// @desc   Gets all the users
// @route  /api/user/
// @access Public
const getAllUsers = async (req, res) => {
  try {
    const data = await User.find({});
    console.log(data);
    res.json(data);
  } catch (err) {
    console.log(err);
  }
};

// @desc   Gets the user from given token
// @route  /api/user/:token
// @access Public
const getUserByToken = async (req, res) => {
  const token = req.params.token;

  try {
    const { id } = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(id);
    if (!user) {
      return res.status(401).json({
        success: false,
        error: "User is not logged in",
      });
    }

    res.json({ success: true, user });
  } catch (err) {
    return res.status(401).json({
      success: false,
      error: "User is not logged in",
    });
  }
};

module.exports = { userSignup, userSignin, getAllUsers, getUserByToken };
