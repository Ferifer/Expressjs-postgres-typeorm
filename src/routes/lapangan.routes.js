const LapanganRepository = require("../repository/lapangan.repository");
const { Router } = require("express");
const router = Router();
const lapanganRepository = new LapanganRepository();

router.get("/", async (req, res) => {
  const lapangan = await lapanganRepository.findAll();
  res.json({
    status: 200,
    message: "List lapangan",
    data: { list: lapangan },
  });
});

router.get("/:id", async (req, res) => {
  const user = await lapanganRepository.findById(req.params.id);
  if (user) {
    res.json({
      status: 200,
      message: "Detail lapangan",
      data: user,
    });
  } else {
    res.status(404).json({
      status: 404,
      message: "User not found",
      data: user,
    });
  }
});

router.post("/", async (req, res) => {
  const lapangan = await lapanganRepository.create(req.body);
  res
    .status(201)
    .json({ status: 201, message: "Success Create lapangan ", data: lapangan });
});

router.put("/:id", async (req, res) => {
  const result = await lapanganRepository.update(req.params.id, req.body);
  
  if (result.affected) {
    res.status(200).json({ status: 200,message: "User updated successfully", data: null });
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
