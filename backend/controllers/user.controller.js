const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const register = async (req, res, next) => {
  try {
    const { email, password, name } = req.body;
    if (!email || !password || !name)
      return res.status(401).json({
        success: false,
        message: "all fields are required",
      });
    const newuser = await User({ email, password, name });
    const savedUser = await newuser.save();
    return res.json({
      success: true,
      user: savedUser,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "internal server error",
    });
  }
};
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(401).json({
        success: false,
        message: "all fields are required",
      });
    const user = await User.findOne({ email });
    if (!user)
      return res.status(401).json({
        success: false,
        message: "invalid username or password",
      });
    const isMatching = await bcrypt.compare(password, user.password);
    if (!isMatching)
      return res.status(401).json({
        success: false,
        message: "invalid username or password",
      });

    const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, {
      expiresIn: "1w",
    });

    res.cookie("token", token);
    return res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "internal server error",
    });
  }
};
const getMyProfile = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    const decodedData = jwt.verify(token, process.env.SECRET_KEY);
    if (!decodedData)
      return res.status(401).json({
        success: false,
        message: "invalid token",
      });
    const user = await User.findById(decodedData.id);
    return res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "internal server error",
    });
  }
};
const logout = async (req, res, next) => {
  try {
    res.cookie("token", null, { expiresIn: Date.now() });
    res.status(200).json({ success: true });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "internal server error",
    });
  }
};
module.exports = { register, login, getMyProfile, logout };
