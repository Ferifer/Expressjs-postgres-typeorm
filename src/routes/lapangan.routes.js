const LapanganRepository = require("../repository/lapangan.repository");
const { Router } = require("express");
const router = Router();
const lapanganRepository = new LapanganRepository();

router.use((req, res, next) => {
  if (req.method !== "GET" && !req.is("application/json")) {
    return res
      .status(400)
      .json({ status: 400, message: "Invalid content type" });
  }
  next();
});
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
    res
      .status(200)
      .json({ status: 200, message: "User updated successfully", data: null });
  } else {
    res.status(404).json("User not found");
  }
});

// ========== BULK OPERATIONS ==========

router.post("/bulk", async (req, res) => {
  try {
    const { data } = req.body; // Destructure request body
    if (!Array.isArray(data) || data.length === 0) {
      return res
        .status(400)
        .json({ status: 400, message: "Invalid data format" });
    }

    const lapangans = data.map(({ name, price, type, address }) => ({
      name,
      price,
      type,
      address,
    }));

    const result = await lapanganRepository.bulkCreate(lapangans);
    res.status(201).json({
      status: 201,
      message: "Bulk create successful",
      data: result,
    });
  } catch (error) {
    res.status(500).json({ status: 500, message: error.message });
  }
});

router.patch("/bulk", async (req, res) => {
  try {
    const { data } = req.body; // Destructure request body
    if (!Array.isArray(data) || data.length === 0) {
      return res
        .status(400)
        .json({ status: 400, message: "Invalid data format" });
    }

    const updates = data.map(({ id, name, price, type, address }) => ({
      id,
      name,
      price,
      type,
      address,
    }));

    await lapanganRepository.bulkUpdate(updates);
    res.status(200).json({
      status: 200,
      message: "Bulk update successful",
      data: null,
    });
  } catch (error) {
    res.status(500).json({ status: 500, message: error.message });
  }
});

// Bulk Delete
router.delete("/bulk", async (req, res) => {
  try {
    const { data } = req.body; // Expecting { data: [1, 2, 3] }
    if (!Array.isArray(data) || data.length === 0) {
      return res.status(400).json({ status: 400, message: "Invalid data" });
    }
    const result = await lapanganRepository.bulkDelete(data);
    res.status(200).json({
      status: 200,
      message: "Bulk delete successful",
      data: null,
    });
  } catch (error) {
    res.status(500).json({ status: 500, message: error.message });
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
