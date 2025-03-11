// controllers/userController.js
const User = require("../models/User");

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password"); // Exclude passwords
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: "Error fetching users" });
  }
};