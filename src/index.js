require("reflect-metadata");
const express = require("express");
const AppDataSource = require("./data-source");
const app = express();
const PORT = process.env.PORT || 3000;
const userRouter = require("./routes/user.routes");
app.use(express.json());

// Routes
app.use("/users", userRouter);

AppDataSource.initialize()
  .then(() => {
    console.log("Connected to the database");

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => console.log(error));
