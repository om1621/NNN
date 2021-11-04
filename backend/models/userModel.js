const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { isEmail } = require("validator");

const userSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: [true, "please enter username"],
    },
    email: {
      type: String,
      required: [true, "please enter email"],
      unique: true,
      validate: [isEmail, "please enter valid email"],
    },
    password: {
      type: String,
      required: [true, "please enter password"],
      minLength: [6, "Minimum valid length for password is 6"],
    },
    lastWankedDay: {
      type: Date,
      required: true,
      default: new Date("2021/10/31"),
    },
    score: {
      type: Number,
      required: true,
      default: 0,
    },
    wankingCount: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

// pre is a mongoose middelware, thus next() called
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.statics.login = async function (email, password) {
  const user = await this.findOne({ email });

  if (user) {
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (isPasswordValid) {
      return user;
    }

    throw "invalid password";
  }

  throw "invalid email";
};

const User = mongoose.model("User", userSchema);

module.exports = User;
