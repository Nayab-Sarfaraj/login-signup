const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const userScheme = mongoose.Schema({
  name: {
    type: String,
    required: [true, "name is required"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
});
userScheme.pre("save", async function () {
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    console.log(this.password);
  } catch (error) {
    console.log(error);
  }
});

const User = mongoose.model("user", userScheme);
module.exports = User;
