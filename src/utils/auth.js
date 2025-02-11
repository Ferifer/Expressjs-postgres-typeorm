const jwt = require("jsonwebtoken");
// Import bcrypt untuk menggunakan package tersebut
const bcrypt = require("bcrypt");

const SECRET_KEY = "1sampai8"; // Replace with a strong secret key

const SALT_ROUNDS = 10; // Number of salt rounds for bcrypt

// Function to generate a JWT token
const generateToken = (user) => {
  return jwt.sign({ id: user.id, username: user.username }, SECRET_KEY, {
    expiresIn: "1h",
  });
};

// Middleware to verify token
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // Bearer <token>

  if (!token) {
    return res.status(401).json({
      message: "No token provided",
      status: 401,
      data: null,
    });
  }

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) {
      return res.status(403).json({
        message: "Token is not valid",
        status: 403,
        data: null,
      });
    }

    req.user = user;
    next();
  });
};

// Function to hash a password
const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(SALT_ROUNDS);
  return await bcrypt.hash(password, salt);
};

// Function to compare a password with a hashed password
const comparePassword = async (password, hashedPassword) => {
  return await bcrypt.compare(password, hashedPassword);
};

module.exports = {
  generateToken,
  authenticateToken,
  hashPassword,
  comparePassword,
};
