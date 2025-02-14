/**
 * Modul Validator Autentikasi
 *
 * Modul ini berisi aturan validasi untuk proses autentikasi, termasuk registrasi dan login.
 */
const { body } = require("express-validator");

/**
 * Objek authValidator
 *
 * Berisi dua properti: register dan login, masing-masing merupakan array yang mendefinisikan
 * aturan validasi untuk proses registrasi dan login.
 */
const authValidator = {
  /**
   * Aturan validasi untuk registrasi
   *
   * @property {Array} register - Array berisi aturan validasi untuk registrasi
   */
  register: [
    // Validasi nama
    body("name").notEmpty().withMessage("Name is required"),

    // Validasi email
    body("email")
      .notEmpty()
      .withMessage("Email is required")
      .isEmail()
      .withMessage("Invalid email format"),

    // Validasi password
    body("password")
      .isStrongPassword({
        minLength: 6,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,
        maxRepeat: 3,
      })
      .withMessage(
        "Password must be at least 6 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one symbol"
      ),

    body("address").notEmpty().withMessage("Address is required "),
  ],

  /**
   * Aturan validasi untuk login
   *
   * @property {Array} login - Array berisi aturan validasi untuk login
   */
  login: [
    // Validasi email
    body("email")
      .notEmpty()
      .withMessage("Email is required")
      .isEmail()
      .withMessage("Invalid email format"),

    // Validasi password
    body("password").notEmpty().withMessage("Password is required"),
  ],
};

// Ekspor modul authValidator
module.exports = authValidator;
