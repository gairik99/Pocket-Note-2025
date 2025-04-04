const express = require("express");
const app = express();
const cors = require("cors");
const userRouter = require("./routes/userRoutes");
const authRouter = require("./routes/authRoutes");
app.use(cors());
app.use(express.json());

app.use("/api/v1/users", userRouter);
app.use("/api/v1", authRouter);

app.get("/", (req, res) => {
  return res.status(200).json({ message: "this is home page" });
});

module.exports = app;
