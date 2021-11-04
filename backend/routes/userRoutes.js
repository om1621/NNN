const express = require("express");
const router = express.Router();
const {
  userSignup,
  userSignin,
  getAllUsers,
  getUserByToken,
} = require("../controllers/userController");

router.get("/", getAllUsers);
router.get("/:token", getUserByToken);
router.post("/signup", userSignup);
router.post("/login", userSignin);

module.exports = router;
