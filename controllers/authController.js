const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

// exports.register = async (req, res) => {
//     const { username, password, role } = req.body;
//     const accounts = await web3.eth.getAccounts();
    
//     // Get first unused account
//     const usedAddresses = await User.distinct('address');
//     const availableAccount = accounts.find(acc => !usedAddresses.includes(acc));
    
//     if (!availableAccount) return res.status(400).json({ message: "No available voting accounts" });

//     const hashedPassword = await bcrypt.hash(password, 10);
//     const user = new User({ 
//         username, 
//         password: hashedPassword, 
//         role,
//         address: availableAccount 
//     });
    
//     await user.save();
//     res.status(201).json({ message: "User registered successfully." });
// };

// exports.login = async (req, res) => {
//     const { username, password } = req.body;
//     const user = await User.findOne({ username });
    
//     if (!user || !(await bcrypt.compare(password, user.password))) {
//         return res.status(400).json({ message: "Invalid credentials." });
//     }

//     // Invalidate previous tokens
//     user.tokenVersion += 1;
//     await user.save();

//     const token = jwt.sign(
//         { id: user._id, tokenVersion: user.tokenVersion }, 
//         process.env.JWT_SECRET, 
//         { expiresIn: "1h" }
//     );
    
//     res.json({ token });
// };



exports.register = async (req, res) => {
    const { username, password, role } = req.body;
  
    try {
      // Hash the user's password
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Create and save the new user
      const user = new User({
        username,
        password: hashedPassword,
        role
      });
  
      await user.save();
  
      // Generate a JWT token
      const token = jwt.sign(
        { userId: user._id, role: user.role }, // Payload
        process.env.JWT_SECRET, // Secret key from your environment
        { expiresIn: '1h' } // Token expiration time (1 hour for example)
      );
  
      // Send the response with token and role
      res.status(201).json({
        message: "User registered successfully.",
        token: token,
        role: user.role
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error during registration", error: error.message });
    }
  };

exports.login = async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(400).json({ message: "Invalid credentials." });
    }
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1h" });
    res.json({
        message: "Login successful",
        token: token,
        username: user.username,
        role: user.role
    });
};