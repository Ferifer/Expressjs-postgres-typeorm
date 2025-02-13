/**
 * Modul Rute Autentikasi
 *
 * Modul ini menangani rute-rute yang berhubungan dengan autentikasi pengguna,
 * termasuk registrasi dan login.
 */
const bcrypt = require("bcrypt");
const UserRepository = require("../repository/user.repository");
const { Router } = require("express");
const { generateToken } = require("../utils/auth");
const { validationResult } = require("express-validator");
const userValidator = require("../validators/auth.validator");
const router = Router();
const userRepository = new UserRepository();

/**
 * Rute Registrasi Pengguna
 *
 * Menangani permintaan POST untuk registrasi pengguna baru.
 */
router.post("/register", userValidator.register, async (req, res) => {
  try {
    // Cek hasil validasi
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ status: 400, errors: errors.array() });
    }
    const { email, password, name, address } = req.body;

    // Periksa apakah pengguna sudah ada
    const existingUser = await userRepository.findByEmail(email);
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "User already exists", status: 400, data: null });
    }

    // Buat objek pengguna baru
    const newUser = {
      name,
      password,
      address,
      email,
    };

    // Simpan pengguna baru ke database
    await userRepository.create(newUser);

    // Kirim respons sukses
    res.status(201).json({
      message: "User registered successfully",
      status: 201,
      data: null,
    });
  } catch (error) {
    // Tangani error server
    res.status(500).json({ message: "Server error", status: 500, data: null });
  }
});

/**
 * Rute Login Pengguna
 *
 * Menangani permintaan POST untuk login pengguna.
 */
router.post("/login", userValidator.login, async (req, res) => {
  try {
    // Cek hasil validasi
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ status: 400, errors: errors.array() });
    }
    const { email, password } = req.body;

    // Cari pengguna berdasarkan email
    const user = await userRepository.findByEmail(email);
    if (!user) {
      return res
        .status(401)
        .json({ status: 401, message: "Invalid credentials", data: null });
    }

    // Bandingkan password yang di-hash
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(401)
        .json({ status: 401, message: "Invalid credentials", data: null });
    }

    // Generate token JWT
    const token = generateToken({ id: user.id, email: user.email });
    await userRepository.update(user.id, { access_token: token });

    // Kirim respons sukses dengan token
    res.json({
      status: 200,
      message: "Login successful",
      data: { access_token: token },
    });
  } catch (error) {
    // Tangani error server
    res.status(500).json({ message: "Server error", status: 500, data: null });
  }
});

module.exports = router;
