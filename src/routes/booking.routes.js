// Memanggil Repository yang berisi kumpulan function di class Booking
const BookingRepository = require("../repository/booking.repository");
const bookingRepository = new BookingRepository();
// Memanggil function Router agar nantinya dapat di panggil dan di daftarkan di index.js
const { Router } = require("express");
const router = Router();

// kumpulan API/Url
// 1. setelah route gunakan method request (post, get, patch, put, delete)
router.get("/", async (req, res) => {
  // memanggil function dari Class Booking Repository
  const booking = await bookingRepository.findAll();
  // return/ data berbentuk JSON yang kita berikan (res.json)
  res.json({
    status: 200,
    message: "List booking",
    //data yang di berikan ke FE
    data: { list: booking },
  });
});

// untuk detail biasanya menggunakan path variable (/:id)
router.get("/:id", async (req, res) => {
  const booking = await bookingRepository.findById(req.params.id);
  if (booking) {
    res.json({
      status: 200,
      message: "Detail booking",
      data: booking,
    });
  } else {
    res.status(404).json({
      status: 404,
      message: "booking not found",
      data: booking,
    });
  }
});

router.post("/", async (req, res) => {
  const booking = await bookingRepository.create(req.body);
  res
    .status(201)
    .json({ status: 201, message: "Success Create booking ", data: booking });
});

router.put("/:id", async (req, res) => {
  const result = await lapanganRepository.update(req.params.id, req.body);

  if (result.affected) {
    res
      .status(200)
      .json({ status: 200, message: "User updated successfully", data: null });
  } else {
    res.status(404).json("User not found");
  }
});

router.delete("/:id", async (req, res) => {
  const result = await lapanganRepository.delete(req.params.id);
  console.log(result);
  if (result.affected) {
    res.json({ message: "User deleted successfully" });
  } else {
    res.status(404).send("User not found");
  }
});

module.exports = router;
