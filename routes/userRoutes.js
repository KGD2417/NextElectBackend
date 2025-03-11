// routes/userRoutes.js
const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const authMiddleware = require("../middleware/authMiddleware");

// Correct route definition
router.get(
  "/",
  authMiddleware, // Authentication check
  userController.getAllUsers // Proper controller reference
);

module.exports = router;