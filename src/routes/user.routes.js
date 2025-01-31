const UserRepository = require("../repository/user.repository");
const { Router } = require("express");
const router = Router();
const userRepository = new UserRepository();

router.get("/", async (req, res) => {
  const users = await userRepository.findAll();
  res.json({
    status: 200,
    message: "List Users",
    data: { list: users },
  });
});

router.get("/:id", async (req, res) => {
  const user = await userRepository.findById(req.params.id);
  if (user) {
    res.json({
      status: 200,
      message: "List Users",
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
  const user = await userRepository.create(req.body);
  res
    .status(201)
    .json({ status: 201, message: "Success Create User ", data: user });
});

// router.put("/:id", async (req, res) => {
//   const result = await userRepository.update(req.params.id, req.body);
//   if (result.affected) {
//     res.json({ message: "User updated successfully" });
//   } else {
//     res.status(404).send("User not found");
//   }
// });

// router.delete("/:id", async (req, res) => {
//   const result = await userRepository.delete(req.params.id);
//   if (result.affected) {
//     res.json({ message: "User deleted successfully" });
//   } else {
//     res.status(404).send("User not found");
//   }
// });

module.exports = router;
