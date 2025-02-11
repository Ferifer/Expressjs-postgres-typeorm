const bcrypt = require("bcrypt");
const UserRepository = require("../repository/user.repository");
const { Router } = require("express");
const { generateToken } = require("../utils/auth");

const router = Router();
const userRepository = new UserRepository();

// Register User
router.post("/register", async (req, res) => {
  try {
    const { email, password, name, address } = req.body;

    // Check if user already exists
    const existingUser = await userRepository.findByEmail(email);
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "User already exists", status: 400, data: null });
    }

    const newUser = {
      name,
      password,
      address,
      email,
    };

    await userRepository.create(newUser);

    res.status(201).json({
      message: "User registered successfully",
      status: 201,
      data: null,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", status: 500, data: null });
  }
});

// Login User
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await userRepository.findByEmail(email);
    if (!user) {
      return res
        .status(401)
        .json({ status: 401, message: "Invalid credentials", data: null });
    }

    // Compare hashed passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(401)
        .json({ status: 401, message: "Invalid credentials", data: null });
    }

    // Generate JWT token
    const token = generateToken({ id: user.id, email: user.email });

    res.json({ status: 200, message: "Login successful", token });
  } catch (error) {
    res.status(500).json({ message: "Server error", status: 500, data: null });
  }
});

module.exports = router;
